const daysGR  = ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο']
const monthsGR = ['Ιανουαρίου', 'Φεβρουαρίου', 'Μαρτίου', 'Απριλίου', 'Μαΐου', 'Ιουνίου', 'Ιουλίου', 'Αυγούστου', 'Σεπτεμβρίου', 'Οκτωβρίου', 'Νοεμβρίου', 'Δεκεμβρίου']

//set listeners when DOM is Loaded
window.addEventListener('DOMContentLoaded', function(){

    // add event for clock every 1s
    this.setInterval(printGRDate, 1000)

    this.document.querySelector('#addNoteBtn').addEventListener('click', function(){
        onInsertControler(document.querySelector('#inputNote').value.trim())
    })

    this.document.querySelector('#inputNote').addEventListener('keyup', function(e){
        //check if the key pressed is actually enter
        if (e.key ==='Enter'){
            onInsertControler(this.value.trim())
        }
    })

})  

/**
 * Shows the current date in Greek
 */
function printGRDate(){
    const currentDate = new Date()
    
    const day = currentDate.getDay()
    const date = currentDate.getDate()
    const month = currentDate.getMonth()
    const year = currentDate.getFullYear()
    
    const hours = currentDate.getHours()
    const minutes = currentDate.getMinutes()
    const seconds = currentDate.getSeconds()
    
    //get from lists in Greek
    const dayStr = daysGR[day]
    const monthStr = monthsGR[month]

    let dateStr = `${dayStr}, ${date} ${monthStr }`
    let timeStr = `${(hours < 10) ? '0' : ''}${hours} : 
                    ${(minutes < 10) ? '0' : ''}${minutes} : 
                    ${(seconds < 10) ? '0' : ''}${seconds}`

    document.querySelector('#dateTxt').innerHTML = dateStr + '<br>' + timeStr
}

/**
 * Controler for button clicked
 * 
 * @param {String} data 
 */
function onInsertControler(data){
    insertNote(data)
    reset()
}

/**
 * It inserts new note and event listeners for
 * delete button (remove note) and
 * checkbox (note strike-through / done)
 * 
 * @param {String} data 
 */
function insertNote(data){
    const origin = document.querySelector('.note.hidden')
    const cloned = origin.cloneNode(true)

    cloned.classList.remove('hidden')
    const lbl = cloned.querySelector('.note-text')
    lbl.textContent = data
    const notesWrapper = document.querySelector('.notes-wrapper')
    //add an event listener to remove the element if delete button is clicked
    cloned.querySelector('#notDelBtn').addEventListener('click', function(){
        cloned.remove()
    })
    //add event listener for checkbox
    cloned.querySelector('#noteCheck').addEventListener('change', function(){
        //strike-through if it is checked
        if (lbl.style.textDecoration === 'line-through'){
            lbl.style.textDecoration = 'none'
        } else {
            lbl.style.textDecoration = 'line-through'
        }
    })
    notesWrapper.appendChild(cloned) 
}

/**
 * Resets the input text element value to empty string
 */
function reset(){
    const inputText = document.querySelector('#inputNote')
    inputText.value = ""
}
