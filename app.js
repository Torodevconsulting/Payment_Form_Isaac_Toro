        const form = document.getElementById('paymentForm');
        const statusAlert = document.getElementById('statusAlert');
        
        const requiredFields = [
            document.getElementById('card'),
            document.getElementById('cvc'),
            document.getElementById('amount'),
            document.getElementById('firstName'),
            document.getElementById('lastName'),
            document.getElementById('city'),
            document.getElementById('state'),
            document.getElementById('postalCode')
        ];

        // We checked if all the fields are filled
        function checkFormFields() {
            let allFilled = true;

            // Loop through each required field
            for (let i = 0; i < requiredFields.length; i++) {
                const field = requiredFields[i];
                
                // If it's the state dropdown, ensure they didn't leave it on the default option
                if (field.id === 'state') {
                    if (field.value === 'Pick a state') {
                        allFilled = false;
                        break; 
                    }
                } 
                // For normal text inputs, check if the value is empty
                else if (field.value.trim() === '') {
                    allFilled = false;
                    break; 
                }
            }
            // For payment method dropdown, check if one option is selected
            const paymentMethods = document.getElementsByName('paymentMethod');
            let paymentSelected = false;
            for (let i = 0; i < paymentMethods.length; i++) {
                if (paymentMethods[i].checked) {
                    paymentSelected = true;
                    break;
                }
            }

            // If all text fields are filled AND a payment method is selected
            if (allFilled && paymentSelected) {
                statusAlert.className = 'alert alert-success';
                statusAlert.innerText = "You're good to go!";
            } else {
                statusAlert.className = 'alert alert-danger';
                statusAlert.innerText = 'Some fields are missing';
            }
        }

        // We added event listeners to all required text fields to check the form whenever the user types or changes something
        for (let i = 0; i < requiredFields.length; i++) {
            requiredFields[i].addEventListener('input', checkFormFields);
            requiredFields[i].addEventListener('change', checkFormFields);
        }

        // We added event listeners to the radio buttons
        const paymentMethods = document.getElementsByName('paymentMethod');
        for (let i = 0; i < paymentMethods.length; i++) {
            paymentMethods[i].addEventListener('change', checkFormFields);
        }