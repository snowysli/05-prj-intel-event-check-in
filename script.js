// Wait for the DOM to load
window.addEventListener("DOMContentLoaded", function () {
  let attendeeCount = 0;
  const maxGoal = 50;
  const form = document.getElementById("checkInForm");
  const attendeeCountSpan = document.getElementById("attendeeCount");
  const progressBar = document.getElementById("progressBar");
  // Team counters
  let waterCount = 0;
  let zeroCount = 0;
  let powerCount = 0;
  const waterCountSpan = document.getElementById("waterCount");
  const zeroCountSpan = document.getElementById("zeroCount");
  const powerCountSpan = document.getElementById("powerCount");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    // Increase total counter
    attendeeCount = attendeeCount + 1;
    attendeeCountSpan.textContent = attendeeCount;

    // Calculate progress percentage
    let percent = Math.round((attendeeCount / maxGoal) * 100);
    if (percent > 100) {
      percent = 100;
    }
    progressBar.style.width = `${percent}%`;

    // Get form values
    const name = document.getElementById("attendeeName").value;
    const team = document.getElementById("teamSelect").value;

    // Increase team counter using selected team value
    const teamCountId = team + "Count";
    const teamCountSpan = document.getElementById(teamCountId);
    let count = parseInt(teamCountSpan.textContent, 10);
    count = count + 1;
    teamCountSpan.textContent = count;

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

    // Clear form fields for next attendee
    document.getElementById("attendeeName").value = "";
    document.getElementById("teamSelect").selectedIndex = 0;
  });
});
