import React from 'react';
import Select from 'react-select';
import './Styles/Navbar.css'

const Navbar = ({userLanguage, setUserLanguage, userTheme, setUserTheme, fontSize, setFontSize}) => {
    const languages = [
        { value: "c", label: "C" },
        { value: "cpp", label: "C++" },
        { value: "python", label: "Python" },
        { value: "java", label: "Java" },
    ];
    const themes = [
        { value: "vs-dark", label: "Dark" },
        { value: "light", label: "Light" },
    ];
    return (
        <div className='Navbar'>
            <div className='title'>CodeWrite</div>
            <Select options={languages} value={userLanguage}
            onChange={(e) => setUserLanguage(e.value)}
            placeholder={userLanguage} />
            <Select options={themes} value={userTheme}
            onChange={(e) => setUserTheme(e.value)}
            placeholder={userTheme} />
            <label>Font Size</label>
            <input type="range" min="16" max="30"
                value={fontSize} step="1"
                onChange={(e) => {setFontSize(e.target.value)}} />
        </div>
    )
}

export default Navbar