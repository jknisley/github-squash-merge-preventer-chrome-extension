function disableSquashButtons() {
    const squashButton = document.querySelector("button.js-merge-box-button-squash");
    if (squashButton) {
        squashButton.disabled = true;
    }
    
    const squashButtonGroup = document.querySelector("button.btn-group-squash");
    if (squashButtonGroup) {
        squashButtonGroup.disabled = true;
    }
}

function checkBranch(){
    chrome.storage.sync.get(({branchesList:[]}), (data)=>{  
        const targetBranch = document.querySelector("span.commit-ref span.css-truncate-target").innerText
        if (data.branchesList.includes(targetBranch)) {
            // ensure the merge commit option is selected
            const mergeButton = document.querySelector("button.js-merge-box-button-merge");
            if (mergeButton) {
                mergeButton.click();
            }

            // disabled buttons to select squash and merge
            disableSquashButtons();

            // when the override checkbox is checked, we need to re-disable the squash buttons
            const mergeOverrideCheckbox = document.querySelector("input[type='checkbox'].js-admin-merge-override");
            if (mergeOverrideCheckbox) {
                mergeOverrideCheckbox.addEventListener('change', function() {
                    if (this.checked) {
                        setTimeout(disableSquashButtons, 125);
                    }
                });
            }
        }    
    })
}


window.onload = function() {
    setTimeout(checkBranch, 1000);
}
