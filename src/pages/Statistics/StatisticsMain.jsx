
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchMonthlyStats } from '../../redux/statistics/operations';
// import { selectStatistics } from '../../redux/statistics/selectors';
// import React, { useState,useEffect } from 'react'
// import StatisticsDashboard from '../../components/StatisticsDashboard';
// import StatisticsTable from '../../components/StatisticsTable';
// import Chart from '../../components/Chart/Chart';
// // import css from './Statistics.css'
// import Select from 'react-select';
// import './StatisticsMain.css';
// const months = [
//   'January', 'February', 'March', 'April',
//   'May', 'June', 'July', 'August',
//   'September', 'October', 'November', 'December'
// ]

// const years = ['2020', '2021', '2022', '2023', '2024']

// const categories = [
//   { color: '#FF6B6B', name: 'Car', amount: 1500 },
//   { color: '#A18AFF', name: 'Self care', amount: 800 },
//   { color: '#7BDFF2', name: 'Child care', amount: 2208.5 },
//   { color: '#5C7CFA', name: 'Household products', amount: 300 },
//   { color: '#63E6BE', name: 'Education', amount: 3400 },
//   { color: '#38D9A9', name: 'Leisure', amount: 1230 },
//   { color: '#69DB7C', name: 'Other expenses', amount: 610 }
// ]
// const totalExpenses = categories.reduce((acc, cur) => acc + cur.amount, 0);
// const totalIncome = 27350; // пока заглушка

// const Statistics = () => {

//   const [selectedMonth, setSelectedMonth] = useState('March')
//   const [selectedYear, setSelectedYear] = useState('2023')
  
//   const dispatch = useDispatch();
//   const statistics = useSelector(selectStatistics);

//   const monthOptions = months.map((month) => ({
//     value: month,
//     label: month
//   }));
//   const yearsOptions = years.map((year) => ({
//     value: year,
//     label: year
//   }));
  
//   const categoryOptions = categories.map(cat => ({
//     value: cat.name,
//     label: cat.name
//   }));
  
  
//   const [selected, setSelected] = useState(() => {
//   const saved = localStorage.getItem('selectedCategories');
//   return saved ? JSON.parse(saved) : [];
// });
  

//     const toggleCategory = (option) => {
//        setSelected((prevSelected) => {
//     const isAlreadySelected = prevSelected.some(sel => sel.value === option.value);
//     if (isAlreadySelected) {
//       return prevSelected.filter(sel => sel.value !== option.value);
//     } else {
//       return [...prevSelected, option];
//     }
//   });
//     };
  
//   const CustomOption = (props) => {
//   const { data, isFocused, innerRef, innerProps } = props;
//   const isSelected = selected.some(sel => sel.value === data.value);

//   // Базовые стили
//   const baseStyle = {
//     padding: '10px 14px',
//     cursor: 'pointer',
//     transition: 'transform 0.2s ease',
//     transform: 'scale(1)',
//     color: '#fff',
//     fontWeight: 'normal',
//     backgroundColor: '#2e2e48', // фон по умолчанию
//     borderBottom: '1px solid #3d3d5c',
//     color: isSelected ? 'red' : '#fff',
//     fontWeight: isSelected ? 'bold' : 'normal',
//     border: 'none',
     
//   };


//   if (isFocused) {
//     baseStyle.transform = 'scale(1.05)';
//     baseStyle.backgroundColor = '#3a3a5e'; // светлее при фокусе
//   }

//   return (
//     <div
//       ref={innerRef}
//       {...innerProps}
//       style={baseStyle}
//       // onClick={() => toggleCategory(data)}
//         onMouseDown={(e) => {
//         e.preventDefault(); // ❗️Останавливаем закрытие меню
//         toggleCategory(data);
//       }}
//     >
//       {data.label}
//     </div>
//   );
// };


//  const visibleCategories = categories.filter(cat =>
//   selected.some(sel => sel.value === cat.name)
// );

//     const customStyles = {
//   control: (base, state) => ({
//     ...base,
//     backgroundColor: '#2e2e48', // Тёмный фон инпута
//     borderRadius: 8,
//     padding: 4,
//     borderColor: state.isFocused ? '#50309A' : '#444',
//     boxShadow: state.isFocused ? '0 0 0 1px #50309A' : 'none',
//     '&:hover': {
//       borderColor: '#50309A',
//     },
//       }),
//       dropdownIndicator: () => ({
//     display: 'none', // 🔥 убираем стрелочку
//       }),
//        indicatorSeparator: () => ({
//     display: 'none', // 🔥 убираем перегородку
//   }),
//   menu: (base) => ({
//     ...base,
//     backgroundColor: '#2e2e48',
//     marginTop: 4,
//     borderRadius: 8,
//     overflow: 'hidden',
//     padding: 0,
//     border: 'none',
    
//       }),
//   menuList: (base) => ({
//   ...base,
 
//     padding: 0,
//    maxHeight: 240, // 👈 ограничиваем максимальную высоту
//   overflowY: 'auto',
  
//   overflowX: 'hidden', // ещё раз тут, чтобы наверняка
// }),
//   placeholder: (base) => ({
//   ...base,
//   display: 'flex',
//   justifyContent: 'space-between',
//   width: '100%',
//   color: '#aaa',
// }),
 
//   placeholder: (base) => ({
//     ...base,
//     color: '#aaa',
//   }),
//   singleValue: (base) => ({
//     ...base,
//     color: '#fff',
//   }),
// };


  

//     useEffect(() => {
//   localStorage.setItem('selectedCategories', JSON.stringify(selected));
//     }, [selected]);
  
  
//     return (
//       <div className="p-6 bg-gradient-to-r from-[#1e1e3f] to-[#24142f] min-h-screen text-white flex justify-center items-center">
//         <div className="flex gap-12 w-full max-w-5xl">
         
//           {/* Левая часть — круг */}
//           <div className="flex-1 flex justify-center items-center">
//             <Chart data={categories} />
//           </div>
         
//           {/* Правая часть — категории */}
//           <div className={css.raitBar}>
//             <div className={css.selectBox}>
            
//               <Select
//                 value={monthOptions.find((option) => option.value === selectedMonth)}
//                 onChange={(option) => setSelectedMonth(option.value)}
//                 options={monthOptions}
   
//                 classNamePrefix="custom"
//                 styles={{
//                   control: (base) => ({
//                     ...base,
//                     backgroundColor: 'rgba(74, 86, 226, 0.1)',
//                     border: '1px solid  rgba(255, 255, 255, 0.6)',
//                     borderRadius: '8px',
//                     padding: '4px',
//                     width: '181px',
//                     height: '50px',
//                     fontFamily: 'Poppins, sans-serif',
//                     marginRight: ' 30px',
//                     color: 'white',
//                     fontSize: '16px',
      
//                     boxShadow: 'none',
//                   }),
//                   singleValue: (base) => ({
//                     ...base,
//                     color: 'white',
//                     fontFamily: 'Poppins, sans-serif',
//                   }),
//                   option: (base, state) => ({
//                     ...base,
//                     backgroundColor: state.isFocused ? 'rgba(74, 86, 226, 0.2)' : 'white',
//                     color: 'black',
//                     fontFamily: 'Poppins, sans-serif',
//                   }),
//                   menu: (base) => ({
//                     ...base,
//                     borderRadius: '8px',
//                     overflow: 'hidden',
//                     fontFamily: 'Poppins, sans-serif',
//                   }),
//                   indicatorSeparator: () => ({
//                     display: 'none',
//                   }),
//                 }}
//               />
             
//               <Select
//                 value={yearsOptions.find((option) => option.value === selectedYear)}
//                 onChange={(option) => setSelectedYear(option.value)}
//                 options={yearsOptions}
   
//                 classNamePrefix="custom"
//                 styles={{
//                   control: (base) => ({
//                     ...base,
//                     backgroundColor: 'rgba(74, 86, 226, 0.1)',
//                     border: '1px solid  rgba(255, 255, 255, 0.6)',
//                     borderRadius: '8px',
//                     padding: '4px',
//                     width: '182px',
//                     height: '50px',
//                     fontFamily: 'Poppins, sans-serif',
//                     color: 'white',
//                     fontSize: '16px',
      
//                     boxShadow: 'none',
//                   }),
//                   singleValue: (base) => ({
//                     ...base,
//                     color: 'white',
//                     fontFamily: 'Poppins, sans-serif',
//                   }),
//                   option: (base, state) => ({
//                     ...base,
//                     backgroundColor: state.isFocused ? 'rgba(74, 86, 226, 0.2)' : 'white',
//                     color: 'black',
//                     fontFamily: 'Poppins, sans-serif',
//                   }),
//                   menu: (base) => ({
//                     ...base,
//                     borderRadius: '8px',
//                     overflow: 'hidden',
//                     fontFamily: 'Poppins, sans-serif',
//                   }),
//                   indicatorSeparator: () => ({
//                     display: 'none',
//                   }),
//                 }}
//               />
//             </div>

//             <div className="flex flex-col gap-4">

//               <Select
//                 isMulti
//                 options={categoryOptions}
//                 components={{
//                   MultiValue: () => null, 
//                   Option: CustomOption,
//                 }}
                
//                 value={[]} 
//                 placeholder={
//     <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
//       <span>Category</span>
//       <span>Sum</span>
//     </div>
//   }
//                 styles={customStyles}
//                 closeMenuOnSelect={false}
//   hideSelectedOptions={false}
//   onChange={() => {}}
//               />

//               {visibleCategories.map((cat) => (
//                 <div key={cat.name} className="flex justify-between items-center border-b py-2">
//                   <div className="flex items-center gap-3">
//                     <div className="w-4 h-4 rounded-full" style={{ backgroundColor: cat.color }} />
//                     <span>{cat.name}</span>
//                   </div>
//                   <span>{cat.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
//                 </div>
//               ))}


            

             
//             </div>

//             <div className="flex justify-between mt-6 font-medium text-lg">
//               <div className="text-[#FF6B6B]">Expenses: 10 000.00</div>
//               <div className="text-[#FFD43B]">Income: 34 000.00</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }


//   export default Statistics;
