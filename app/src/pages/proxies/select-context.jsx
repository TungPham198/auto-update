import React, {useState, createContext} from 'react';
import MultiToast from "../../components/defaultToast";
const SelectProxyContext = createContext();

function SelectProvider({children}) {
    const [isCheck, setIsCheck] = useState([]);
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isLive, setIsLive] = useState([]);
    const [isData, setIsData] = useState([]);

    const handleSelectAll = (items) => {
        return (e) => {
            let checkArray = [];
            if (e.target.checked) {
                checkArray =items.map(li => li.uuid);
                setIsCheckAll(true);
                setIsData(items.map(li => li));
            } else {
                setIsCheckAll(false);
                setIsData([]);
            }
            setIsCheck(checkArray);
        }
    };

    const handleClick = e => {
        const { id, checked, dataset } = e.target;
        let dataCheck = JSON.parse(dataset.data);
        if (!checked) {
            setIsCheck(isCheck.filter(item => item !== id));
            setIsData(isData.filter(item => item.uuid !== id));
        } else {
            setIsCheck([...isCheck, id]);
            setIsData([...isData, dataCheck]);
        }
    };

    const resetChecked = () => {
        setIsLive([]);
        setIsCheck([]);
        setIsCheckAll(false);
    };

    const checkProxy = (data) => {
        if (data.length > 0) {
            let arrayCheck = [];
            data.map((item) => {
                if (item.uuid.search("1") > 0) {
                    arrayCheck[item.uuid] = 1;
                } else {
                    arrayCheck[item.uuid] = 2;
                }
            })
            setIsLive(arrayCheck);
            MultiToast.simpleToast({type:'success', title: 'Check '+data.length+' successful'});
        }
    }

    const value = {
        isCheck,
        isCheckAll,
        isLive,
        isData,
        handleSelectAll,
        handleClick,
        resetChecked,
        checkProxy
    }

    return (
        <SelectProxyContext.Provider value={value}>
            {children}
        </SelectProxyContext.Provider>
    )
}

export {SelectProxyContext, SelectProvider}