const daysGR  = ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο']
const monthsGR = ['Ιανουαρίου', 'Φεβρουαρίου', 'Μαρτίου', 'Απριλίου', 'Μαΐου', 'Ιουνίου', 'Ιουλίου', 'Αυγούστου', 'Σεπτεμβρίου', 'Οκτωβρίου', 'Νοεμβρίου', 'Δεκεμβρίου']

$(document).ready(function(){

    // add event for clock every 1s
    setInterval(printGRDate, 1000)

    $('#addNoteBtn').on('click', function(){
        onInsertControler($('#inputNote').val().trim())
        $('#inputNote').val('')
    })

    $('#inputNote').on('keyup', function(e){
        //check if the key pressed is actually enter
        if (e.key ==='Enter'){
            onInsertControler($(this).val().trim())
            $(this).val('')
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

    $('#dateTxt').html(dateStr + '<br>' + timeStr);
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
    const origin = $('.note.hidden')
    const cloned = origin.clone()

    cloned.removeClass('hidden')
    cloned.addClass('d-flex')
    const lbl = cloned.find('.note-text')
    lbl.text(data)
    const notesWrapper = $('.notes-wrapper')
    //add an event listener to remove the element if delete button is clicked
    cloned.find('#notDelBtn').on('click', function(){
        cloned.remove()
    })
    //add event listener for checkbox
    cloned.find('#noteCheck').on('change', function(){
        lbl.toggleClass('line-through', this.checked);
    })

    notesWrapper.append(cloned) 
}

/**
 * Resets the input text element value to empty string
 */
function reset(){
    const inputText = $('#inputNote')
    inputText.text("")
}
