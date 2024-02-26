







document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('loaded');

    // Check user's preference from local storage or default to light mode
    const userPreference = localStorage.getItem('theme') || 'light';
    document.body.classList.add(userPreference + '-mode');

    // Add event listener to the toggle button
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', toggleTheme);
});

function toggleTheme() {
    const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    // Toggle classes on the body
    document.body.classList.replace(currentTheme + '-mode', newTheme + '-mode');

    // Save user preference to local storage
    localStorage.setItem('theme', newTheme);
}

function checkSymptoms() {
    const checkboxes = document.querySelectorAll('input[name="symptom"]:checked');
    const resultElement = document.getElementById('result');
    
    if (checkboxes.length < 2) {
        resultElement.innerHTML = '<p>Please select at least two symptoms.</p>';
        return;
    }

    const symptoms = Array.from(checkboxes).map(checkbox => checkbox.value);

    // Perform symptom checking logic here
    const result = checkSymptomsLogic(symptoms);

    // Display the result
    resultElement.innerHTML = `<p>${result}</p>`;
}

function resetForm() {
    const checkboxes = document.querySelectorAll('input[name="symptom"]:checked');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    const resultElement = document.getElementById('result');
    resultElement.innerHTML = ''; // Clear the result
}

function checkSymptomsLogic(symptoms) {
     // Example: Mapping symptom combinations to results
const resultMappings = {
    'fever_cough': 'You may have a respiratory infection. Rest and stay hydrated.',
    'headache_fatigue': 'These symptoms together may indicate stress or lack of sleep. Take a break and ensure you get enough rest.',
    'shortness_of_breath_chest_pain': 'Seek immediate medical attention. This combination can be indicative of a serious respiratory or cardiac issue.',
    'sore_throat_fever': 'You might be dealing with a throat infection. Gargle with warm salt water and stay hydrated.',
    'nausea_vomiting': 'This may be related to food poisoning or a gastrointestinal issue. Stay hydrated and consider medical attention if symptoms persist.',
    'muscle_aches_joint_pain': 'Muscle and joint pain may indicate inflammation or an autoimmune condition. Consult with a healthcare professional.',
    'chills_headache': 'Chills with a headache may be related to a viral infection. Rest and stay warm.',
    'dizziness_shortness_of_breath': ' This combination can be indicative of a serious issue, especially if sudden.',
    'fatigue_headache_nausea': 'This combination may indicate a migraine or tension headache. Rest in a quiet, dark room.',
    'fever_muscle_aches': 'You may be dealing with the flu. Rest and consider over-the-counter medication for symptom relief.',
    'cough_shortness_of_breath': 'This may indicate a respiratory issue. Rest and stay hydrated. Seek medical attention if symptoms persist.',
    'sore_throat_fatigue': 'You might have an upper respiratory infection. Rest and stay hydrated.',
    'headache_dizziness': 'Dizziness with a headache may be tension-related or indicate a migraine. Rest and consider stress reduction techniques.',
    'nausea_chills': 'This combination may be related to a viral or bacterial infection. Stay hydrated and consider medical attention if symptoms persist.',
    'fever_vomiting': 'Fever with vomiting may indicate a viral or gastrointestinal infection. Stay hydrated and rest.',
    'muscle_aches_dizziness': 'Muscle aches with dizziness may be related to a viral illness. Rest and stay hydrated.',
    'shortness_of_breath_chills': 'Seek medical attention. This combination may indicate a serious respiratory infection.',
    'headache_muscle_aches': 'These symptoms together may indicate a viral illness. Rest and stay hydrated.',
    'sore_throat_chest_pain': 'Sore throat with chest pain requires medical attention. It could be indicative of a serious condition.',
    'headache_nausea': 'Headache with nausea may indicate a migraine or gastrointestinal issue. Rest and stay hydrated.',
    'fatigue_chest_pain': 'Fatigue with chest pain requires medical attention. It could be cardiac-related.',
    'rash_joint_pain': 'Rash with joint pain may indicate an autoimmune or inflammatory condition. Consult with a healthcare professional.',
    'fever_fatigue_headache': 'You may be experiencing the flu. Rest and stay hydrated.',
    'shortness_of_breath_fatigue': 'This combination may indicate a respiratory issue. Seek medical attention if symptoms persist.',
    'fever_chills_muscle_aches': 'You might have the flu. Rest and consider over-the-counter medication for symptom relief.',
    'headache_nausea_dizziness': 'These symptoms together may indicate a migraine. Rest in a quiet, dark room.',
    'fatigue_muscle_aches_chills': 'You may be experiencing a viral infection. Rest and stay hydrated.',
    // Add more result mappings as needed
};



    // Generate all possible combinations of selected symptoms
    const symptomCombinations = generateCombinations(symptoms, 2);

    // Check if any of the combinations have a specific result
    for (const combination of symptomCombinations) {
        const result = resultMappings[combination.join('_')];
        if (result) {
            return result;
        }
    }


    console.log('No Result Found for Combination:', symptomCombinations);

    return 'Seek medical attention';
}




// Helper function to generate all combinations of symptoms
function generateCombinations(arr, k) {
    const result = [];
    const helper = (current, start) => {
        if (current.length === k) {
            result.push([...current]);
            return;
        }
        for (let i = start; i < arr.length; i++) {
            current.push(arr[i]);
            helper(current, i + 1);
            current.pop();
        }
    };
    helper([], 0);
    return result;
}

