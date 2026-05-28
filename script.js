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
        const clearPreferencesBtn = document.getElementById('clearPreferencesBtn');
        const preferredEventTypeKey = 'preferredEventType';
        const findNearbyBtn = document.getElementById('findNearbyBtn');
        const locationOutput = document.getElementById('locationOutput');

        function savePreferredEventType(value) {
            localStorage.setItem(preferredEventTypeKey, value);
            sessionStorage.setItem(preferredEventTypeKey, value);
        }

        function loadPreferredEventType() {
            return localStorage.getItem(preferredEventTypeKey)
                || sessionStorage.getItem(preferredEventTypeKey)
                || '';
        }

        function clearSavedPreferences() {
            localStorage.removeItem(preferredEventTypeKey);
            sessionStorage.removeItem(preferredEventTypeKey);
            document.getElementById('eventType').value = '';
            updateEventFee();
            submitNotice.textContent = 'Preferences cleared.';
        }



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

        document.getElementById('eventType').addEventListener('change', (event) => {
            updateEventFee();
            savePreferredEventType(event.target.value);
        });

        clearPreferencesBtn.addEventListener('click', () => {
            clearSavedPreferences();
        });

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

        function showLocationMessage(message, isError = false) {
            locationOutput.textContent = message;
            locationOutput.classList.toggle('error', isError);
            locationOutput.classList.add('visible');
        }

        function showLocationError(message) {
            showLocationMessage(`❌ ${message}`, true);
        }

        function findNearestEvent(lat, lng) {
            const events = [
                { name: 'Crafts & Coffee Workshop', venue: 'Community Center', lat: 40.741, lng: -73.989, date: 'June 5, 2026' },
                { name: 'Outdoor Yoga Meetup', venue: 'Riverfront Park', lat: 40.748, lng: -73.984, date: 'June 7, 2026' },
                { name: 'Local Music Showcase', venue: 'Town Hall', lat: 40.735, lng: -73.995, date: 'June 12, 2026' }
            ];

            const deg2rad = (deg) => deg * Math.PI / 180;
            const getDistance = (lat1, lng1, lat2, lng2) => {
                const R = 6371;
                const dLat = deg2rad(lat2 - lat1);
                const dLon = deg2rad(lng2 - lng1);
                const a = Math.sin(dLat / 2) ** 2 + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) ** 2;
                return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            };

            let nearest = null;
            for (const event of events) {
                const distance = getDistance(lat, lng, event.lat, event.lng);
                if (!nearest || distance < nearest.distance) {
                    nearest = { ...event, distance };
                }
            }
            return nearest;
        }

        function handleLocationSuccess(position) {
            const { latitude, longitude } = position.coords;
            const nearestEvent = findNearestEvent(latitude, longitude);

            if (!nearestEvent) {
                showLocationError('No nearby events are currently available.');
                return;
            }

            locationOutput.innerHTML = `
                <p><strong>Your coordinates:</strong> ${latitude.toFixed(5)}, ${longitude.toFixed(5)}</p>
                <p><strong>Nearest event:</strong> ${nearestEvent.name}</p>
                <p><strong>Venue:</strong> ${nearestEvent.venue}</p>
                <p><strong>Date:</strong> ${nearestEvent.date}</p>
                <p><strong>Distance:</strong> ${nearestEvent.distance.toFixed(1)} km away</p>
            `;
            locationOutput.classList.remove('error');
            locationOutput.classList.add('visible');
        }

        function handleLocationError(error) {
            const errorMessages = {
                [error.PERMISSION_DENIED]: 'Permission denied. Allow location access to find the nearest event.',
                [error.POSITION_UNAVAILABLE]: 'Your location is unavailable. Check your device settings and try again.',
                [error.TIMEOUT]: 'Location request timed out. Please try again and allow location access.'
            };
            showLocationError(errorMessages[error.code] || 'Unable to retrieve your location. Please try again.');
        }

        findNearbyBtn?.addEventListener('click', () => {
            if (!navigator.geolocation) {
                showLocationError('Geolocation is not supported by this browser.');
                return;
            }

            showLocationMessage('Locating nearby events…');
            navigator.geolocation.getCurrentPosition(handleLocationSuccess, handleLocationError, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            });
        });

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

        const savedEventType = loadPreferredEventType();
        if (savedEventType) {
            document.getElementById('eventType').value = savedEventType;
            updateEventFee();
        } else {
            updateEventFee();
        }

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
