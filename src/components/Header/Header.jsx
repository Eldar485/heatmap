import React from 'react';
import classes from "./Header.module.css";
import MySelect from "../My-Select/My-Select";

const Header = ({cities, currentCity, selectCity, places, currentPlace, selectPlace, currentMethod, methods, selectMethod}) => {
    return (
        <header className={classes.header}>
            <div className={classes.header__item}>
                <MySelect options={cities} value={currentCity} select={selectCity} />
            </div>
            <div className={classes.header__item}>
                <MySelect options={places} value={currentPlace} select={selectPlace} checkBox='true' />
            </div>
            <div className={classes.header__item}>
                <MySelect options={methods} value={currentMethod} select={selectMethod} />
            </div>
        </header>
    );
};

export default Header;