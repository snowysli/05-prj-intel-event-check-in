// Wait for the DOM to load
window.addEventListener("DOMContentLoaded", function () {
  // Load attendee list from localStorage
  const attendeeList = document.getElementById("attendeeList");
  let savedAttendees = [];
  try {
    savedAttendees = JSON.parse(localStorage.getItem("attendeeList")) || [];
  } catch (e) {
    savedAttendees = [];
  }
  savedAttendees.forEach(function (att) {
    const li = document.createElement("li");
    li.innerHTML = `<span class="attendee-name">${att.name}</span> <span class="attendee-team">(${att.teamName})</span>`;
    attendeeList.appendChild(li);
  });
  // Load counts from localStorage or start at 0
  let attendeeCount = parseInt(localStorage.getItem("attendeeCount"), 10) || 0;
  let waterCount = parseInt(localStorage.getItem("waterCount"), 10) || 0;
  let zeroCount = parseInt(localStorage.getItem("zeroCount"), 10) || 0;
  let powerCount = parseInt(localStorage.getItem("powerCount"), 10) || 0;
  const maxGoal = 50;
  const form = document.getElementById("checkInForm");
  const attendeeCountSpan = document.getElementById("attendeeCount");
  const progressBar = document.getElementById("progressBar");
  const waterCountSpan = document.getElementById("waterCount");
  const zeroCountSpan = document.getElementById("zeroCount");
  const powerCountSpan = document.getElementById("powerCount");

  // Set initial counts in UI
  attendeeCountSpan.textContent = attendeeCount;
  waterCountSpan.textContent = waterCount;
  zeroCountSpan.textContent = zeroCount;
  powerCountSpan.textContent = powerCount;

  // Set initial progress bar
  let percent = Math.round((attendeeCount / maxGoal) * 100);
  if (percent > 100) {
    percent = 100;
  }
  progressBar.style.width = `${percent}%`;
  if (percent === 100) {
    progressBar.classList.add("full");
  } else {
    progressBar.classList.remove("full");
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    // Increase total counter
    attendeeCount = attendeeCount + 1;
    attendeeCountSpan.textContent = attendeeCount;
    localStorage.setItem("attendeeCount", attendeeCount);

    // Calculate progress percentage
    let percent = Math.round((attendeeCount / maxGoal) * 100);
    if (percent > 100) {
      percent = 100;
    }
    progressBar.style.width = `${percent}%`;
    // Add effect when full
    if (percent === 100) {
      progressBar.classList.add("full");
    } else {
      progressBar.classList.remove("full");
    }

    // Celebration feature: show message when goal is reached
    if (attendeeCount === maxGoal) {
      // Find the winning team
      const teamCounts = {
        "Team Water Wise": parseInt(
          document.getElementById("waterCount").textContent,
          10
        ),
        "Team Net Zero": parseInt(
          document.getElementById("zeroCount").textContent,
          10
        ),
        "Team Renewables": parseInt(
          document.getElementById("powerCount").textContent,
          10
        ),
      };
      let winningTeam = "";
      let maxCount = 0;
      for (const team in teamCounts) {
        if (teamCounts[team] > maxCount) {
          maxCount = teamCounts[team];
          winningTeam = team;
        }
      }
      // If there's a tie, just show the first team with max count
      const greeting = document.getElementById("greeting");
      greeting.textContent = `🎉 Goal reached! Congratulations to ${winningTeam}! 🎉`;
      greeting.className = "success-message";
      greeting.style.display = "block";
    }

    // Get form values
    const name = document.getElementById("attendeeName").value;
    const team = document.getElementById("teamSelect").value;

    // Increase team counter using selected team value
    const teamCountId = team + "Count";
    const teamCountSpan = document.getElementById(teamCountId);
    let count = parseInt(teamCountSpan.textContent, 10);
    count = count + 1;
    teamCountSpan.textContent = count;
    // Save team count to localStorage
    if (team === "water") {
      waterCount = count;
      localStorage.setItem("waterCount", waterCount);
    } else if (team === "zero") {
      zeroCount = count;
      localStorage.setItem("zeroCount", zeroCount);
    } else if (team === "power") {
      powerCount = count;
      localStorage.setItem("powerCount", powerCount);
    }

    // Custom code goes here
    console.log("Check-in form submitted!");
    // Personalized greeting
    const greeting = document.getElementById("greeting");
    let teamName = "";
    if (team === "water") {
      teamName = "Team Water Wise";
    } else if (team === "zero") {
      teamName = "Team Net Zero";
    } else if (team === "power") {
      teamName = "Team Renewables";
    }
    greeting.textContent = `Welcome, ${name}! You are checked in for ${teamName}.`;
    greeting.className = "success-message";
    greeting.style.display = "block";

    // Add attendee to the list and save to localStorage
    const li = document.createElement("li");
    li.innerHTML = `<span class="attendee-name">${name}</span> <span class="attendee-team">(${teamName})</span>`;
    attendeeList.appendChild(li);
    savedAttendees.push({ name: name, teamName: teamName });
    localStorage.setItem("attendeeList", JSON.stringify(savedAttendees));

    // Clear form fields for next attendee
    document.getElementById("attendeeName").value = "";
    document.getElementById("teamSelect").selectedIndex = 0;
  });
});
