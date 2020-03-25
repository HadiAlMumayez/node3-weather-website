const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne= document.querySelector('#message-1')
const messageTow= document.querySelector('#message-2')

// messageOne.textContent='from js'

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent='Loading...'
    messageTow.textContent=''
    fetch('/weather?address='+encodeURIComponent(location)).then((responce)=>{
    responce.json().then((data)=>{
        if(data.error){
            console.log(data.error)
            messageOne.textContent= data.error
        }
        else {
            messageOne.textContent=data.location
            messageTow.textContent=data.forecast
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})
})