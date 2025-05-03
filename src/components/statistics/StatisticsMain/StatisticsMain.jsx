import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect, useMemo } from "react";
import Chart from "../Chart/Chart.jsx";
import "./StatisticsMain.css";
import Select from "react-select";
import { motion, AnimatePresence } from "framer-motion";
import { components } from "react-select";
import { FaChevronDown } from "react-icons/fa";
import { selectStatistics } from "../../../redux/statistics/selectors.js";
import { getTransactions } from "../../../redux/transactionsOp.js";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const years = ["2020", "2021", "2022", "2023", "2024", "2025"];

const categoryColors = {
  "Main expenses": "#FED057",
  Products: "#FFD8D0",
  Car: "#FD9498",
  "Self care": "#C5BAFF",
  "Child care": "#6E78E8",
  "Household products": "#4A56E2",
  Education: "#81E1FF",
  Leisure: "#24CCA7",
  "Other expenses": "#00AD84",
  Entertainment: "#69DB7C",
};

const getStartEndDates = (monthName, year) => {
  const monthIndex = months.indexOf(monthName);
  const startDate = new Date(year, monthIndex, 1);
  const endDate = new Date(year, monthIndex + 1, 0);
  const format = (date) => date.toISOString().slice(0, 10);
  return { start: format(startDate), end: format(endDate) };
};

const StatisticsMain = () => {
  const dispatch = useDispatch();
  const statistics = useSelector(selectStatistics);

  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(months[now.getMonth()]);
  const [selectedYear, setSelectedYear] = useState(String(now.getFullYear()));
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selected, setSelected] = useState(() => {
    const saved = localStorage.getItem("selectedCategories");
    return saved ? JSON.parse(saved) : [];
  });

  const monthOptions = months.map((month) => ({ value: month, label: month }));
  const yearsOptions = years.map((year) => ({ value: year, label: year }));

  const toggleCategory = (option) => {
    setSelected((prevSelected) => {
      const isAlreadySelected = prevSelected.some(
        (sel) => sel.value === option.value
      );
      if (isAlreadySelected) {
        return prevSelected.filter((sel) => sel.value !== option.value);
      } else {
        return [...prevSelected, option];
      }
    });
  };

  const CustomOption = (props) => {
    const { data, isFocused, innerRef, innerProps } = props;
    const isSelected = selected.some((sel) => sel.value === data.value);
    const baseStyle = {
      padding: "10px 14px",
      cursor: "pointer",
      transition: "transform 0.2s ease",
      transform: "scale(1)",
      color: isSelected ? "#FF868D" : "#fff",
      fontWeight: isSelected ? "bold" : "normal",
      border: "none",
    };
    if (isFocused) {
      baseStyle.transform = "scale(1.05)";
      baseStyle.backgroundColor = "#FFFFFF1A";
    }
    return (
      <div
        ref={innerRef}
        {...innerProps}
        style={baseStyle}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleCategory(data);
        }}
      >
        {data.label}
      </div>
    );
  };

  const CustomMenu = (props) => {
    const { menuIsOpen } = props.selectProps;
    return (
      <AnimatePresence>
        {menuIsOpen && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <components.Menu {...props} />
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  const CustomDropdownIndicator = (props) => {
    const isOpen = props.selectProps.menuIsOpen;
    return (
      <components.DropdownIndicator {...props}>
        <FaChevronDown
          style={{
            transition: "transform 0.2s ease",
            transform: isOpen ? "rotate(0deg)" : "rotate(180deg)",
            color: "#ccc",
          }}
        />
      </components.DropdownIndicator>
    );
  };

  const CustomDropdownIndicatorSecond = (props) => {
    const isOpen = props.selectProps.menuIsOpen;
    return (
      <components.DropdownIndicator {...props}>
        <FaChevronDown
          style={{
            transition: "transform 0.2s ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            color: "#ccc",
          }}
        />
      </components.DropdownIndicator>
    );
  };

  const groupedStatistics = useMemo(() => {
    const grouped = {};
    filteredTransactions.forEach((tx) => {
      const category = tx.category;
      if (!grouped[category]) {
        grouped[category] = { category, summ: 0 };
      }
      grouped[category].summ += tx.summ || 0;
    });
    return Object.values(grouped);
  }, [filteredTransactions]);

  const statisticsForChartAndSelect = useMemo(() => {
    return groupedStatistics.filter((stat) => stat.category !== "Income");
  }, [groupedStatistics]);

  const categoryOptions = statisticsForChartAndSelect.map((item) => ({
    value: item.category,
    label: item.category,
  }));

  const visibleCategories = statisticsForChartAndSelect.filter((stat) =>
    selected.some((sel) => sel.value === stat.category)
  );

  const totalIncome = groupedStatistics
    .filter((stat) => stat.category === "Income")
    .reduce((acc, stat) => acc + stat.summ, 0);

  const totalExpenses = groupedStatistics
    .filter((stat) => stat.category !== "Income")
    .reduce((acc, stat) => acc + stat.summ, 0);

  useEffect(() => {
    const { start, end } = getStartEndDates(selectedMonth, selectedYear);
    dispatch(getTransactions()).then((res) => {
      const allTransactions = res.payload;
      const filtered = allTransactions.filter((tx) => {
        const date = new Date(tx.date);
        return date >= new Date(start) && date <= new Date(end);
      });
      setFilteredTransactions(filtered);

      const allCategories = Array.from(
        new Set(filtered.map((s) => s.category))
      ).map((category) => ({
        value: category,
        label: category,
      }));
      setSelected(allCategories);
      localStorage.setItem("selectedCategories", JSON.stringify(allCategories));
    });
  }, [selectedMonth, selectedYear, dispatch]);

  useEffect(() => {
    localStorage.setItem("selectedCategories", JSON.stringify(selected));
  }, [selected]);

  return (
    <div className="wrapper">
      <div className="container">
        <div className="chartSection">
          <div className="chartNameBox">
            <p className="chartName">Statistics</p>
          </div>
          <Chart statistics={statisticsForChartAndSelect} />
        </div>

        <div className="raitBar">
          <div className="selectBox">
            <div className="selectWrapper">
              <Select
                value={monthOptions.find(
                  (option) => option.value === selectedMonth
                )}
                onChange={(option) => setSelectedMonth(option.value)}
                options={monthOptions}
                className="custom-select"
                classNamePrefix="custom-select"
                components={{ DropdownIndicator: CustomDropdownIndicator }}
              />
            </div>

            <div className="selectWrapper">
              <Select
                value={yearsOptions.find(
                  (option) => option.value === selectedYear
                )}
                onChange={(option) => setSelectedYear(option.value)}
                options={yearsOptions}
                className="custom-select"
                classNamePrefix="custom-select"
                components={{
                  DropdownIndicator: CustomDropdownIndicatorSecond,
                }}
              />
            </div>
          </div>

          <Select
            isMulti
            options={categoryOptions}
            classNamePrefix="category-select"
            className="category-select"
            components={{
              MultiValue: () => null,
              Option: CustomOption,
              Menu: CustomMenu,
            }}
            value={[]}
            placeholder={
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Category</span>
                <span>Sum</span>
              </div>
            }
          />

          <div className="qwe">
            {visibleCategories.map((cat) => {
              const color = categoryColors[cat.category] || "#ccc";
              return (
                <div key={cat.category} className="categoriWrapper">
                  <div className="nameCategoriContainer">
                    <div className="quad" style={{ backgroundColor: color }} />
                    <span className="quadStyle">{cat.category}</span>
                  </div>
                  <span className="numberSpan">
                    {cat.summ.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
              );
            })}
          </div>

          {visibleCategories.length > 0 ? (
            <div className="expensesIncomeBlock">
              <div className="expenses">
                Expenses:
                <span className="expensesNumber">
                  {totalExpenses.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="income">
                Income:
                <span className="incomeNumber">
                  {totalIncome.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          ) : (
            <div className="selectExpensesIncomeBlock">
              Sorry, there are no transactions in the selected period.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatisticsMain;
