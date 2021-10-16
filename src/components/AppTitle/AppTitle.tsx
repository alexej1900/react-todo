import React from 'react';
import styles from './AppTitle.module.css';

const AppTitle:React.FunctionComponent<{content: string}> = ({content})=> {
  return (
    <>
      <h2 className={styles.appTitle}>{content}</h2>
      <div className={styles.line}></div>
    </>
    
  )
}

export default AppTitle;
