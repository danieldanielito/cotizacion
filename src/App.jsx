import { useState, useEffect } from "react"
import Header from "./components/header"
import Button from "./components/button";
import {formatearDinero,calcularTotalPagar} from "./helpers"


function App() {
  let [cantidad,setCantidad] = useState(10000);
  let [meses,setMeses] = useState(6);
  let [total,setTotal] = useState(0);
  let [pago,setPago] = useState(0);
   
  useEffect(()=>{
    let resultadoTotalAPagar = calcularTotalPagar(cantidad,meses)
    setTotal(resultadoTotalAPagar)

    //calcular el pago mensual
    setPago(total/meses)
  }, [cantidad,meses,total])

  let MIN = 0;
  let MAX = 20000;
  let STEP =100;
 
  function handleChange(e){
       setCantidad(+e.target.value);
  }
  
  function handleClickDecrement(){
    let valor = cantidad - STEP;
    if(valor<MIN){
      alert('Cantidad no Valida')
      return
    } 
    setCantidad(valor)
}
function handleClickIncrement(){
  let valor = cantidad + STEP;
  if(valor>MAX){
    alert('Cantidad no Valida')
    return
  } 
  setCantidad(valor)
}


  return (
   <div className="my-20 max-w-lg mx-auto bg-white shadow p-10">
    <Header />
    <div className=" flex justify-between my-14">
    <Button
    operador='-'
    fn={handleClickDecrement}
    />
    <Button 
    operador='+'
    fn={handleClickIncrement}
    />

      {/* <button
      type="button"
      className=" h-10 w-10 flex items-center justify-center font-bold 
       text-2xl bg-lime-500 rounded-full hover:outline-none hover:ring-2
        hover:ring-offset-2 hover:ring-lime-500"
        onClick={handleClickIncrement}
      >+</button> */}
      

    </div>
    <input
     type="range" 
     className="w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600"
     onChange={handleChange}
     min={MIN}
     max={MAX}
     step={STEP}
     value={cantidad}
     />
   <p className=" text-center my-10 text-5xl font-extrabold text-indigo-600 ">{formatearDinero(cantidad)}</p>
   
   <h2 className=" text-2xl font-extrabold text-gray-500 text-center ">
       Elige un <span className="text-indigo-600">Plazo </span>a pagar
   </h2>

   <select
     className=" mt-5 w-full p-2 bg-white border border-gray-300
      rounded-lg text-center text-xl font-bold text-gray-500"
      value={meses}
      onChange={e=>setMeses(+e.target.value)}
   >
    <option value="6">6 meses</option>
    <option value="12">12 meses</option>
    <option value="24">24 meses</option>
   </select>
    
    <div className=" my-5 space-y-3 bg-gray-50 p-5">
    <h2 className=" text-2xl font-extrabold text-gray-500 text-center ">
       Resumen <span className="text-indigo-600">de Pagos </span>
   </h2>
   <p className="text-xl text-gray-500 text-center font-bold ">{meses} Meses</p>
   <p className="text-xl text-gray-500 text-center font-bold ">{formatearDinero(total)} Total a pagar</p>
   <p className="text-xl text-gray-500 text-center font-bold ">{formatearDinero(pago)}Mensuales</p>
    

    </div>

   </div>
  )
}

export default App
