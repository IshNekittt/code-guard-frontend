


import { useDispatch, useSelector } from "react-redux";
import { selectStatistics } from "../../../redux/auth/selectors.js";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import Chart from "../Chart/Chart.jsx";
import "./StatisticsMain.css";
import Select from "react-select";
import { getTransactionsStatistics } from "../../../redux/auth/operations.js";
import { motion, AnimatePresence } from 'framer-motion';
import { components } from 'react-select';

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
  "Main expenses": "#FF6B6B",
  "Products": "#FF6B6B",
  "Car": "#FF6B6B",
  "Self care": "#A18AFF",
  "Child care": "#7BDFF2",
  "Household products": "#5C7CFA",
  "Education": "#63E6BE",
  "Leisure": "#38D9A9",
  "Other expenses": "#69DB7C",
  "Entertainment": "#69DB7C",
  "Income": "#69DB7C",
};

const getStartEndDates = (monthName, year) => {
  const monthIndex = months.indexOf(monthName);
  if (monthIndex === -1) throw new Error("Invalid month name");

  const startDate = new Date(year, monthIndex, 1);
  const endDate = new Date(year, monthIndex + 1, 0);

  const format = (date) => date.toISOString().slice(0, 10);

  return {
    start: format(startDate),
    end: format(endDate),
  };
};

const StatisticsMain = () => {
  const [selectedMonth, setSelectedMonth] = useState("April");
  const [selectedYear, setSelectedYear] = useState("2024");


  const dispatch = useDispatch();

  const statistics = useSelector(selectStatistics);
  //console.log("приходит в статистикс", statistics);

  const monthOptions = months.map((month) => ({
    value: month,
    label: month,
  }));

  const yearsOptions = years.map((year) => ({
    value: year,
    label: year,
  }));

 

  const [selected, setSelected] = useState(() => {
    const saved = localStorage.getItem("selectedCategories");   
    return saved ? JSON.parse(saved) : [];
     
  });


  //console.log(' cелектед лог ', selected)
  
  const toggleCategory = (option) => {
    setSelected((prevSelected) => {
      const isAlreadySelected = prevSelected.some(
        (sel) => sel.value === option.value
      );
      if (isAlreadySelected) {
        // console.log(' возвращфет  превСел если СелЕктВыбран', prevSelected)
        return prevSelected.filter((sel) => sel.value !== option.value);
       
      } else {
         //console.log(' возвращфет  превСел если СелЕктНеВыбран', option)
        return [...prevSelected, option];
      }
    });
  };

  const CustomOption = (props) => {
    const { data, isFocused, innerRef, innerProps } = props;
    const isSelected = selected.some((sel) => sel.value === data.value);

    const baseStyle = {
      padding: '10px 14px',
     
      cursor: 'pointer',
      transition: 'transform 0.2s ease',
      transform: 'scale(1)',
      color: isSelected ? '#FF868D' : '#fff',
      fontWeight: isSelected ? 'bold' : 'normal',
      border: 'none',
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
          // style={{ position: 'absolute', width: '100%', zIndex: 999 }}
        >
          <components.Menu {...props} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};



 const categoryOptions = Array.isArray(statistics)
    ? Array.from(new Set(statistics.map((statis) => statis.category))).map(
        (category) => ({
          value: category,
          label: category,
        })
      )
    : [];
  // console.log("Что выбрано в категориОпц", categoryOptions);
    

  const totalIncome = Array.isArray(statistics)
    ? statistics
        .filter((stat) => stat.category === "Income")
        .reduce((acc, stat) => acc + (stat.summ || 0), 0)
    : 0;

  const totalExpenses = Array.isArray(statistics)
    ? statistics
        .filter((stat) => stat.category !== "Income")
        .reduce((acc, stat) => acc + (stat.summ || 0), 0)
    : 0;
  
  

  
 const visibleCategories = Array.isArray(statistics)
    ? statistics.filter((stat) =>
        selected.some((sel) => sel.value === stat.category)
      )
    : [];
  
  
 // console.log('видимые категории', visibleCategories);


  useEffect(() => {
  const { start, end } = getStartEndDates(selectedMonth, selectedYear);

  dispatch(getTransactionsStatistics({ start, end })).then((res) => {
    const stats = res.payload?.data;

    if (Array.isArray(stats)) {
      const allCategories = Array.from(
        new Set(stats.map((s) => s.category))
      ).map((category) => ({
        value: category,
        label: category,
      }));

      setSelected(allCategories);
      localStorage.setItem("selectedCategories", JSON.stringify(allCategories));
    }
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
          <Chart statistics={statistics} />
        </div>

        <div className="raitBar">
          <div className="selectBox">
            <div className="selectWrapper">
               <Select
              value={monthOptions.find((option) => option.value === selectedMonth)}
              onChange={(option) => setSelectedMonth(option.value)}
              options={monthOptions}
              className="custom-select"
                classNamePrefix="custom-select"
              //   components={{
              //    Menu: CustomMenu, 
              // }}
            />
            </div>
           
            <div className="selectWrapper">
              <Select
              value={yearsOptions.find((option) => option.value === selectedYear)}
              onChange={(option) => setSelectedYear(option.value)}
              options={yearsOptions}
              className="custom-select"
                classNamePrefix="custom-select"
              //   components={{
              //    Menu: CustomMenu, 
              // }}
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
              
                  <div key={cat._id} className="categoriWrapper">
                <div className="nameCategoriContainer">
                  <div className="quad" style={{ backgroundColor: color }} />
                  <span className="quadStyle">{cat.category}</span>
                      </div>
                     <span className="numberSpan">{cat.summ?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '0.00'}</span>
                  </div>
               
              )              
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