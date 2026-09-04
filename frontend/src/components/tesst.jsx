import React from 'react'

const tesst = () => {

const getAvailableslots = () => {
    setDocSlots([])

    let today = new Date()
    for (let i = 0; i <7 ; i++){
        let currentDate = new Date(today)
        currentDate.setDate(today.getDate() + i);
    
        let endTime = new Date()
        endTime.setDate(today.getDate()+i)
        endTime.setHours(21,0,0,0)

        if(today.getDate() === currentDate.getDate()){
            currentDate.setHours(currentDate.getHours() >10 ? currentDate.getHours()+1 : 10)
            currentDate.setMinutes(currentDate.getMinutes >30 ? 30 : 0)

        }else{
            currentDate.setHours(10)
            currentDate.setMinutes(0)
        }
 let timeSlots=[]
        if(currentDate<endTime){
          let formattedDate=  currentDate.toLocaleTimeString([],{hour: "2-digit" ,minute:"2-digit"})
          timeSlots.push({
            datetime :new Date(currentDate),
            time:formattedDate
          })
          currentDate.setMinutes(currentDate.getMinutes()+ 30)
        }
        setDocSlots(prev => ([...prev ,timeSlots]))
    }
}

  return (
    <div>
      
    </div>
  )
}

export default tesst
