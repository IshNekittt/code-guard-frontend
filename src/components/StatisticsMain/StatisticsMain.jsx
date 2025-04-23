
import { useDispatch, useSelector } from 'react-redux';
import { fetchMonthlyStats } from '../../redux/statistics/operations';
import { selectStatistics } from '../../redux/statistics/selectors';
import React, { useState,useEffect } from 'react'
import StatisticsDashboard from '../StatisticsDashboard';
import StatisticsTable from '../StatisticsTable';
import Chart from '../Chart/Chart';
import css from './StatisticsMain.module.css'
import Select from 'react-select';

const months = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
]

const years = ['2020', '2021', '2022', '2023', '2024']

const categories = [
  { color: '#FF6B6B', name: 'Car', amount: 1500 },
  { color: '#A18AFF', name: 'Self care', amount: 800 },
  { color: '#7BDFF2', name: 'Child care', amount: 2208.5 },
  { color: '#5C7CFA', name: 'Household products', amount: 300 },
  { color: '#63E6BE', name: 'Education', amount: 3400 },
  { color: '#38D9A9', name: 'Leisure', amount: 1230 },
  { color: '#69DB7C', name: 'Other expenses', amount: 610 }
]
const totalExpenses = categories.reduce((acc, cur) => acc + cur.amount, 0);
const totalIncome = 27350; // пока заглушка

const StatisticsMain = () => {

  const [selectedMonth, setSelectedMonth] = useState('March')
  const [selectedYear, setSelectedYear] = useState('2023')
  
  const dispatch = useDispatch();
  const statistics = useSelector(selectStatistics);

  const monthOptions = months.map((month) => ({
    value: month,
    label: month
  }));
  const yearsOptions = years.map((year) => ({
    value: year,
    label: year
  }));
  
  const categoryOptions = categories.map(cat => ({
    value: cat.name,
    label: cat.name
  }));
  
  
  const [selected, setSelected] = useState(() => {
  const saved = localStorage.getItem('selectedCategories');
  return saved ? JSON.parse(saved) : [];
});
  

    const toggleCategory = (option) => {
       setSelected((prevSelected) => {
    const isAlreadySelected = prevSelected.some(sel => sel.value === option.value);
    if (isAlreadySelected) {
      return prevSelected.filter(sel => sel.value !== option.value);
    } else {
      return [...prevSelected, option];
    }
  });
    };
  
  const CustomOption = (props) => {
  const { data, isFocused, innerRef, innerProps } = props;
  const isSelected = selected.some(sel => sel.value === data.value);

  // Базовые стили
  const baseStyle = {
    padding: '10px 14px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    transform: 'scale(1)',
   // color: '#fff',
    //fontWeight: 'normal',
   // backgroundColor: '#2e2e48', // фон по умолчанию
    //: '1px solid #3d3d5c',
   color: isSelected ? '#FF868D' : '#fff',
    fontWeight: isSelected ? 'bold' : 'normal',
    border: 'none',
     
  };


  if (isFocused) {
    baseStyle.transform = 'scale(1.05)';
    baseStyle.backgroundColor = '#FFFFFF1A'; // светлее при фокусе
  }

  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={baseStyle}
      // onClick={() => toggleCategory(data)}
        onMouseDown={(e) => {
        e.preventDefault(); // ❗️Останавливаем закрытие меню
        toggleCategory(data);
      }}
    >
      {data.label}
    </div>
  );
};


 const visibleCategories = categories.filter(cat =>
  selected.some(sel => sel.value === cat.name)
  );
  
const MonthYearCustomOption = (props) => {
  const { data, isFocused, innerRef, innerProps } = props;
  //const isSelected = selected.some(sel => sel.value === data.value);

  // Базовые стили
  const baseStyle = {
    padding: '10px 14px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    transform: 'scale(1)',
  
    //color: isSelected ? '#FF868D' : '#fff',
    //fontWeight: isSelected ? 'bold' : 'normal',
    border: 'none',
     
  };


  if (isFocused) {
    baseStyle.transform = 'scale(1.05)';
    baseStyle.backgroundColor = '#FFFFFF1A'; // светлее при фокусе
  }

  return (
    <div ref={innerRef} {...innerProps}
      style={baseStyle}
    >
       {data.label} 
    </div>
  );
};



  
  const customStylesMonthYear = {
    
       control: (base, state) => ({
                    ...base,
                    backgroundColor: 'rgba(74, 86, 226, 0.1)',
                    border: '1px solid  rgba(255, 255, 255, 0.6)',
                    borderRadius: '8px',
                    padding: '4px',
                    width: '181px',
                    height: '50px',
                    fontFamily: 'Poppins, sans-serif',
                    marginRight: ' 30px',
                    color: 'white',
                    fontSize: '16px',
      
                    boxShadow: 'none',
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: 'white',
                    fontFamily: 'Poppins, sans-serif',
                    
                  }),
                  option: (base, state) => ({
                    ...base,
                   
                    //backgroundColor: state.isFocused ? 'rgba(74, 86, 226, 0.2)' : 'white',
                   
                     fontFamily: 'Poppins',
                    fontWeight: '400',
                    fontSize: '16px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    color: '#FBFBFB',

                  }),
                  menu: (base) => ({
                    ...base,
                    borderRadius: '8px',
                    overflow: 'hidden',
                    fontFamily: 'Poppins, sans-serif',
                    background: '#50309A',
                    //backgroundColor: state.isFocused ? 'rgba(74, 86, 226, 0.2)' : '#50309A',
                  }),
                  indicatorSeparator: () => ({
                    display: 'none',
    }),
                  
                  menuList: (base) => ({
  ...base,
 
   
  overflowY: 'auto',
  
  overflowX: 'hidden', // ещё раз тут, чтобы наверняка
}),
  }
  
  
    const customStyles = {
    control: (base, state) => ({
    ...base,
        backgroundColor: '#523B7E99',
      backdropFilter:' blur(100px)',

      boxShadow: '0px 4px 60px 0px #00000040',
      fontFamily:' Poppins',
      fontWeight: '600',
      fontSize: '16px',
      lineHeight: '100%',
      letterSpacing: '0%',
      color: '#FBFBFB',
          borderRadius: 8,
              padding: 4,
          border: 'none',
    
    //borderColor: state.isFocused ? '#50309A' : '#444',
    boxShadow: state.isFocused ? '0 0 0 1px #50309A' : 'none',
    '&:hover': {
      borderColor: '#50309A',
    },
      }),
      dropdownIndicator: () => ({
    display: 'none', // 🔥 убираем стрелочку
      }),
       indicatorSeparator: () => ({
    display: 'none', // 🔥 убираем перегородку
  }),
  menu: (base) => ({
    ...base,
   background: '#50309A',

    marginTop: 4,
    width: '394',
height: '444',
borderRadius: '8px',

    overflow: 'hidden',
    padding: 0,
    border: 'none',
    
      }),
  menuList: (base) => ({
  ...base,
 
    padding: 0,
   maxHeight: 240, // 👈 ограничиваем максимальную высоту
  overflowY: 'auto',
  
  overflowX: 'hidden', // ещё раз тут, чтобы наверняка
}),
  placeholder: (base) => ({
  ...base,
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
    color: '#FBFBFB',
 
    
}),

  singleValue: (base) => ({
    ...base,
    color: '#fff',
    fontFamily: 'Poppins',
fontWeight: '400',
fontSize: '16px',
lineHeight: '100%',
letterSpacing: '0%',
verticalAlign: 'middle',

  }),
};


  

    useEffect(() => {
  localStorage.setItem('selectedCategories', JSON.stringify(selected));
    }, [selected]);
  
  
    return (
   <div className={css.wrapper}>


        <div className={css.container}>
         
          {/* Левая часть — круг */}
         <div className={css.chartSection}>
            <Chart data={categories} />
          </div>
         
          {/* Правая часть — категории */}
          <div className={css.raitBar}>
            <div className={css.selectBox}>
            
              <Select
               
                value={monthOptions.find((option) => option.value === selectedMonth)}
                onChange={(option) => setSelectedMonth(option.value)}
                options={monthOptions}
                 components={{
                  Option: MonthYearCustomOption,
                }}
                styles={customStylesMonthYear}
              />
             
              <Select
                value={yearsOptions.find((option) => option.value === selectedYear)}
                onChange={(option) => setSelectedYear(option.value)}
                options={yearsOptions}
                styles={customStylesMonthYear}
                 components={{
                  Option: MonthYearCustomOption,
                }}
              />
            </div>

            <div className="flex flex-col gap-4">

              <Select
                isMulti
                options={categoryOptions}
                components={{
                  MultiValue: () => null, 
                  Option: CustomOption,
                }}
                
                value={[]} 
                placeholder={
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Category</span>
                    <span>Sum</span>
                  </div>
                }
                              styles={customStyles}
                              closeMenuOnSelect={false}
                hideSelectedOptions={false}
                onChange={() => {}}
              />

              {visibleCategories.map((cat) => (
                <div key={cat.name} className={css.categoriWrapper}>
                 
                    <div className={css.nameCategoriContainer}>
                       <div className={css.quad} style={{ backgroundColor: cat.color }} />
                    <span>{cat.name}</span>
                    </div>
                   
                  
                  <span className={css.numberSpan}>{cat.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              ))}


            

             
            </div>

            <div className={css.expensesIncomeBlock}>

              <div className={css.expenses}>Expenses:
                <span className={css.expensesNumber}>10 000.00</span>
              </div>
              <div className={css.income}>Income:
                <span className={css.incomeNumber}>34 000.00
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }


  export default StatisticsMain;
