import { FormModal } from './Modals.js';

let form;

export default form = (() => {
    function init(update) {
        const addButton = document.getElementById('add');
        addButton.addEventListener('click', async () => {
            const modal = new FormModal('Form', 'button1', 'button2');
            await modal.show();
            console.log('updated');
            update();
        });
    }
    
    return {
        init: init
    }
})();