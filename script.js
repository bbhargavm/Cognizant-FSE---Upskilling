const modal = document.getElementById('registrationModal');

        const registerLink = document.getElementById('registerLink');

        const closeModal = document.getElementById('closeModal');

        const eventRegisterLink = document.getElementById('eventRegisterLink');

        const openRegisterBtn = document.getElementById('openRegisterBtn');

        const form = document.getElementById('eventForm');

        const outputContainer = document.getElementById('outputContainer');

        const confirmationOutput = document.getElementById('confirmationOutput');

        const confirmationText = document.getElementById('confirmationText');

        const phoneInput = document.getElementById('phone');
        const phoneError = document.getElementById('phoneError');
        const eventFeeDisplay = document.getElementById('eventFee');
        const submitNotice = document.getElementById('submitNotice');
        const feedbackCount = document.getElementById('feedbackCount');
        const lastKey = document.getElementById('lastKey');
        const eventImage = document.getElementById('eventImage');



        // Open modal

        registerLink.addEventListener('click', () => {

            modal.classList.add('active');

            document.getElementById('name').focus();

        });



        eventRegisterLink.addEventListener('click', () => {

            modal.classList.add('active');

            document.getElementById('name').focus();

        });



        openRegisterBtn.addEventListener('click', () => {

            modal.classList.add('active');

            document.getElementById('name').focus();

        });



        // Close modal

        closeModal.addEventListener('click', () => {

            modal.classList.remove('active');

        });



        // Close modal on overlay click

        modal.addEventListener('click', (e) => {

            if (e.target === modal) {

                modal.classList.remove('active');

            }

        });



        // Form submission

        form.addEventListener('submit', function(e) {

            e.preventDefault();



            if (!form.checkValidity()) {

                confirmationOutput.classList.remove('success');

                confirmationOutput.classList.add('error');

                confirmationText.innerHTML = '<strong>❌ Please fill in all required fields correctly.</strong>';

                outputContainer.classList.add('show');

                return;

            }



            const messageLength = document.getElementById('message').value.trim().length;

            if (messageLength < 10) {

                confirmationOutput.classList.remove('success');

                confirmationOutput.classList.add('error');

                confirmationText.innerHTML = '<strong>❌ Message must be at least 10 characters long.</strong>';

                outputContainer.classList.add('show');

                return;

            }



            const formData = {

                name: document.getElementById('name').value,

                email: document.getElementById('email').value,

                date: document.getElementById('date').value,

                eventType: document.getElementById('eventType').value,

                message: document.getElementById('message').value

            };



            const dateObj = new Date(formData.date);

            const formattedDate = dateObj.toLocaleDateString('en-US', {

                weekday: 'long',

                year: 'numeric',

                month: 'long',

                day: 'numeric'

            });



            const eventTypeLabel = document.querySelector(`#eventType option[value="${formData.eventType}"]`).text;



            confirmationOutput.classList.remove('error');

            confirmationOutput.classList.add('success');

            confirmationText.innerHTML = `

                <p><strong>Name:</strong> ${escapeHtml(formData.name)}</p>

                <p><strong>Email:</strong> ${escapeHtml(formData.email)}</p>

                <p><strong>Event Date:</strong> ${formattedDate}</p>

                <p><strong>Event Type:</strong> ${eventTypeLabel}</p>

                <p><strong>Message:</strong> ${escapeHtml(formData.message)}</p>

                <p style="margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid rgba(0,0,0,0.1);">

                    A confirmation email has been sent to <strong>${escapeHtml(formData.email)}</strong>

                </p>

            `;



            outputContainer.classList.add('show');



            // Scroll to output after showing confirmation

            setTimeout(() => {

                outputContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            }, 100);

        });



        form.addEventListener('reset', function() {

            outputContainer.classList.remove('show');

        });



        function validatePhone() {

            const phoneValue = phoneInput.value.trim();
            const phoneRegex = /^\+?[0-9\s-()]{7,20}$/;

            if (!phoneRegex.test(phoneValue)) {
                phoneError.textContent = 'Please enter a valid phone number.';
                phoneInput.classList.add('input-error');
                phoneInput.setCustomValidity('Invalid phone number');
            } else {
                phoneError.textContent = 'Enter your contact number for urgent updates.';
                phoneInput.classList.remove('input-error');
                phoneInput.setCustomValidity('');
            }
        }

        function updateEventFee() {
            const fees = {
                workshop: '$25',
                seminar: '$40',
                networking: '$10',
                conference: '$70',
                social: '$15',
                training: '$35',
                webinar: 'Free'
            };
            const selectedValue = document.getElementById('eventType').value;
            eventFeeDisplay.textContent = selectedValue ? fees[selectedValue] : 'Select an event type';
        }

        function showSubmitConfirmation(e) {
            submitNotice.textContent = 'Preparing to submit your registration...';
        }

        function toggleImageSize() {
            eventImage.classList.toggle('enlarged');
        }

        function updateFeedbackCount(e) {
            const currentLength = document.getElementById('message').value.length;
            feedbackCount.textContent = currentLength;
            lastKey.textContent = e.key || 'Unknown';
        }

        function escapeHtml(text) {

            const map = {

                '&': '&amp;',

                '<': '&lt;',

                '>': '&gt;',

                '"': '&quot;',

                "'": '&#039;'

            };

            return text.replace(/[&<>"']/g, m => map[m]);

        }



        // Focus on first field on page load

        document.getElementById('name').focus();



        // Back to Top Button

        const backToTopButton = document.getElementById('backToTop');

        

        window.addEventListener('scroll', () => {

            if (window.pageYOffset > 300) {

                backToTopButton.classList.add('show');

            } else {

                backToTopButton.classList.remove('show');

            }

        });



        // Smooth scroll for anchor links

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {

            anchor.addEventListener('click', function (e) {

                const href = this.getAttribute('href');

                if (href !== '#' && document.querySelector(href)) {

                    e.preventDefault();

                    document.querySelector(href).scrollIntoView({

                        behavior: 'smooth',

                        block: 'start'

                    });

                }

            });

        });
