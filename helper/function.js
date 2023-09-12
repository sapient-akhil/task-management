module.exports = {
    calculateHourAndMinutes: async (hours, minutes) => {
        // Calculate the total minutes
        let totalMinutes = hours * 60 + minutes;
        // Calculate hours and minutes
        let formattedHours = Math.floor(totalMinutes / 60);
        let formattedMinutes = totalMinutes % 60;
        // Convert to HH:MM format
        let formattedTime =
            formattedHours.toString().padStart(2, "0") +
            ":" +
            formattedMinutes.toString().padStart(2, "0");
        return formattedTime;
    }
} 
