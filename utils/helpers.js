module.exports = {
    age:(dateString)=>{
        const birthDate = new Date(dateString); // Convert the string to a Date object
        const today = new Date(); // Get the current date
      
        let age = today.getFullYear() - birthDate.getFullYear(); // Calculate the year difference
        const monthDiff = today.getMonth() - birthDate.getMonth(); // Calculate the month difference
        const dayDiff = today.getDate() - birthDate.getDate(); // Calculate the day difference
      console.log(0)
        // Adjust age if the current date is before the birth date in the year
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
          age--;
        }
      
        return age;
      }
}