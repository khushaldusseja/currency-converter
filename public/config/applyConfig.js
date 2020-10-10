(function () {
    const defaultEnviromentConfig = window.hasOwnProperty("__defaultEnviromentConfig") ? window.__defaultEnviromentConfig : {};
    const enviromentConfig = window.hasOwnProperty("__enviromentConfig") ? window.__enviromentConfig : {};

    const mergedConfig = Object.assign(defaultEnviromentConfig, enviromentConfig);

    function getEnvConfigurationProp(prop) {
	    return mergedConfig.hasOwnProperty(prop) ? mergedConfig[prop] : null;
    }
    
    window.getEnvConfigurationProp = getEnvConfigurationProp;
})(window);