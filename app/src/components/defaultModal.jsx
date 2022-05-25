import {useState, useCallback} from 'react';

const useModal = () => {
    const [isShowing, setIsShowing] = useState(false);
    const [modalName, setModalName] = useState([]);
    const [modalData, setModalData] = useState({});


    const toggle = useCallback((status, name, data = {}) => {
        setIsShowing(status);
        if (!status) {
            setModalName(modalName.filter(item => item !== name));
            setModalData({});
            document.body.style.overflowY = "scroll";
        } else {
            document.body.style.overflowY = "hidden";
            setModalName([...modalName, name]);
            setModalData(data);
        }
    }, [])

    return {
        isShowing,
        modalName,
        modalData,
        toggle,
    }
};

export default useModal;