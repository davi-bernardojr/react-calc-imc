import { useState } from 'react'
import styles from './App.module.css'
import poweredImage from './assets/powered.png'
import { GridItem } from './components/GridItem'
import leftArrowImage from './assets/leftArrow.png'

import { levels, calculateImc, Level } from './helpers/imc'

const App = () => {
  const [hightField, setHightField] = useState<number>(0)
  const [weightField, setWeightField] = useState<number>(0)
  const [toShow, setToShow] = useState<Level | null>(null)

  const handleCalculateButton = () => {
    if (hightField && weightField) {
      setToShow(calculateImc(hightField, weightField))      
    } else {
      alert("Preencha todos os campos antes.")
    }
  }

  const handleBackButton = () => {
    setToShow(null)
    setHightField(0)
    setWeightField(0)
  }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} width={150} />
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule seu IMC</h1>
          <p>IMC é sigla para indice de massa corpórea, parâmetro adotado pela OMS para calcular o peso ideal para cada pessoa. </p>
          <input 
            type = "number"
            step = {0.1}
            placeholder = "Digite a sua altura. ex: 1.5 (em metros)"
            value = {hightField > 0  ? hightField : ''}
            onChange = {e => setHightField(parseFloat(e.target.value))}
            disabled= {toShow ? true : false}
          />
          <input 
            type = "number"
            step={0.1}
            placeholder = "Digite seu peso. ex: 1.5 (em kg)"
            value = {weightField > 0 ? weightField : ''}
            onChange = {e => setWeightField(parseFloat(e.target.value))}
            disabled= {toShow ? true : false}
          />
          <button onClick={handleCalculateButton} disabled= {toShow ? true : false} >Calcular</button>
        </div>
        <div className={styles.rightSide}>
          {!toShow &&
            <div className={styles.grid}>
              {levels.map((item, key) => (
                <GridItem key={key} item={item} />
              ))}
            </div>
          }
          {toShow && 
            <div className={styles.rightBig}>
              <div onClick={handleBackButton} className={styles.rightArrow}>
                <img src={leftArrowImage} width={25} />
              </div>
              <GridItem item={toShow} />
            </div>
          }
        </div>
      </div>
    </div>
  ) 
}
export default App
