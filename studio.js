document.addEventListener("DOMContentLoaded", () => {
    const studioForm = document.querySelector("#studioForm");
    const songTitle = document.querySelector("#songTitle");
    const songNotes = document.querySelector("#songNotes");
    const keySelect = document.querySelector("#key-select");
    const moodButtons = document.querySelectorAll(
        ".bg-blue-500, .bg-yellow-500, .bg-red-500, .bg-purple-500"
    );
    let selectedMood = "";
    // Diatonic chords for each key
    const keyChords = {
        "C Major": ["C", "Dm", "Em", "F", "G", "Am", "Bdim"],
        "C♯/D♭ Major": ["C♯", "D♯m", "E♯m", "F♯", "G♯", "A♯m", "B♯dim"],
        "D Major": ["D", "Em", "F♯m", "G", "A", "Bm", "C♯dim"],
        "D♯/E♭ Major": ["E♭", "Fm", "Gm", "A♭", "B♭", "Cm", "Ddim"],
        "E Major": ["E", "F♯m", "G♯m", "A", "B", "C♯m", "D♯dim"],
        "F Major": ["F", "Gm", "Am", "B♭", "C", "Dm", "Edim"],
        "F♯/G♭ Major": ["F♯", "G♯m", "A♯m", "B", "C♯", "D♯m", "E♯dim"],
        "G Major": ["G", "Am", "Bm", "C", "D", "Em", "F♯dim"],
        "G♯/A♭ Major": ["A♭", "B♭m", "Cm", "D♭", "E♭", "Fm", "Gdim"],
        "A Major": ["A", "Bm", "C♯m", "D", "E", "F♯m", "G♯dim"],
        "A♯/B♭ Major": ["B♭", "Cm", "Dm", "E♭", "F", "Gm", "Adim"],
        "B Major": ["B", "C♯m", "D♯m", "E", "F♯", "G♯m", "A♯dim"],

        "A Minor": ["Am", "Bdim", "C", "Dm", "Em", "F", "G"],
        "A♯/B♭ Minor": ["A♯m", "Cdim", "C♯", "D♯m", "Fm", "F♯", "G♯"],
        "B Minor": ["Bm", "C♯dim", "D", "Em", "F♯m", "G", "A"],
        "C Minor": ["Cm", "Ddim", "E♭", "Fm", "Gm", "A♭", "B♭"],
        "C♯/D♭ Minor": ["C♯m", "D♯dim", "E", "F♯m", "G♯m", "A", "B"],
        "D Minor": ["Dm", "Edim", "F", "Gm", "Am", "B♭", "C"],
        "D♯/E♭ Minor": ["D♯m", "Fdim", "F♯", "G♯m", "A♯m", "B", "C♯"],
        "E Minor": ["Em", "F♯dim", "G", "Am", "Bm", "C", "D"],
        "F Minor": ["Fm", "Gdim", "A♭", "B♭m", "Cm", "D♭", "E♭"],
        "F♯/G♭ Minor": ["F♯m", "G♯dim", "A", "Bm", "C♯m", "D", "E"],
        "G Minor": ["Gm", "Adim", "B♭", "Cm", "Dm", "E♭", "F"],
        "G♯/A♭ Minor": ["G♯m", "A♯dim", "B", "C♯m", "D♯m", "E", "F♯"],
    };

    // Example progressions using chord indices
    const progressionTemplates = [
        [0, 3, 4, 0], // I - IV - V - I
        [5, 3, 0, 4], // vi - IV - I - V
        [1, 4, 0], // ii - V - I
        [0, 5, 1, 4], // I - vi - ii - V
        [0, 4, 5, 3], // I - V - vi - IV
    ];

    function updateChordSuggestions(selectedKey) {
        const chords = keyChords[selectedKey];
        const suggestionList = document.querySelector("#chord-suggestions");
        suggestionList.innerHTML = "";

        if (!chords) {
            suggestionList.innerHTML =
                "<li>No chords available for this key.</li>";
            return;
        }

        progressionTemplates.forEach((progression, idx) => {
            const chordProgression = progression
                .map((i) => chords[i])
                .join(" - ");
            const li = document.createElement("li");
            li.textContent = `${selectedKey}: ${chordProgression}`;
            suggestionList.appendChild(li);
        });
    }

    // Attach event listener
    document.getElementById("key-select").addEventListener("change", (e) => {
        const selected = e.target.value;
        if (selected && selected !== "Select a key") {
            updateChordSuggestions(selected);
        }
    });

    // Mood selection handler
    moodButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            selectedMood = btn.textContent.trim();

            // Optional: visually mark the selected one
            moodButtons.forEach((b) =>
                b.classList.remove("ring", "ring-offset-2")
            );
            btn.classList.add("ring", "ring-offset-2");
        });
    });
    studioForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const selectedKey = keySelect.value;

        // Get selected instruments
        const instrumentCheckboxes = studioForm.querySelectorAll(
            'input[type="checkbox"]'
        );
        const selectedInstruments = Array.from(instrumentCheckboxes)
            .filter((cb) => cb.checked)
            .map((cb) => cb.parentElement.textContent.trim())
            .join(", ");

        // Generate chord progressions
        const chords = keyChords[selectedKey];
        let progressionText = "No progressions available.";

        if (chords) {
            const progressions = progressionTemplates.map((pattern) =>
                pattern.map((i) => chords[i]).join(" - ")
            );
            progressionText = progressions
                .map((p, idx) => `  ${idx + 1}. ${p}`)
                .join("\n");
        }

        // Compose rich description with chord progressions
        const descriptionParts = [
            `Key: ${selectedKey}`,
            `Suggested Progressions:\n${progressionText}`,
            `Mood: ${selectedMood || "Not selected"}`,
            `Instruments: ${selectedInstruments || "None"}`,
            `Notes: ${songNotes.value.trim() || "No notes provided"}`,
        ];
        const fullDescription = descriptionParts.join("\n\n");

        const newTask = {
            name: songTitle.value || "Untitled Song Idea",
            description: fullDescription,
            date: new Date().toISOString().split("T")[0],
            status: "Pending",
            source: "studio",
        };

        // Save to localStorage
        const existing = JSON.parse(localStorage.getItem("tasks")) || [];
        existing.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(existing));

        // Reset form fields
        songTitle.value = "";
        songNotes.value = "";
        keySelect.selectedIndex = 0;
        instrumentCheckboxes.forEach((cb) => (cb.checked = false));
        selectedMood = "";
        moodButtons.forEach((btn) =>
            btn.classList.remove("ring", "ring-offset-2")
        );
        document.querySelector("#chord-suggestions").innerHTML = "";

        alert("Song saved as task!");
    });
});
