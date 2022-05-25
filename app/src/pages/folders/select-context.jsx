import React, {useState, createContext} from 'react';
const selectFolderContext = createContext();

function SelectProvider({children}) {
  const [isCheck, setIsCheck] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);

  const handleSelectAll = (items) => {
    return (e) => {
      let checkArray = [];
      if (e.target.checked) {
        checkArray =items.map(li => li.uuid);
        setIsCheckAll(true);
      } else {
        setIsCheckAll(false);
      }
      setIsCheck(checkArray);
    }
  };

  const handleClick = e => {
    const { id, checked } = e.target;
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== id));
    } else {
      setIsCheck([...isCheck, id]);
    }
  };

  const resetChecked = () => {
    setIsCheck([]);
    setIsCheckAll(false);
  };

  const value = {
    isCheck,
    isCheckAll,
    handleSelectAll,
    handleClick,
    resetChecked
  }

  return (
    <selectFolderContext.Provider value={value}>
      {children}
    </selectFolderContext.Provider>
  )
}

export {selectFolderContext, SelectProvider}