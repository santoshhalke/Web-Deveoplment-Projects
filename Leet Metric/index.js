window.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.getElementById("search-button");

    searchButton.addEventListener("click", getData);

    function displayData(result) {

        // Extracting and displaying the data
        const totalEasy = result.data.allQuestionsCount[1].count;
        const totalMedium = result.data.allQuestionsCount[2].count;
        const totalHard = result.data.allQuestionsCount[3].count;

        // console.log(totalEasy, totalMedium, totalHard);

        const solvedEasy = result.data.matchedUser.submitStats.acSubmissionNum[1].count;
        const solvedMedium = result.data.matchedUser.submitStats.acSubmissionNum[2].count;
        const solvedHard = result.data.matchedUser.submitStats.acSubmissionNum[3].count;

        const easyChart = document.querySelectorAll('.circle')[0];
        const mediumChart = document.querySelectorAll('.circle')[1];
        const hardChart = document.querySelectorAll('.circle')[2];

        const easyNumbers = document.querySelector(".easy-count");
        easyNumbers.textContent = `${solvedEasy}/${totalEasy}`;
        // easyChart.appendChild(easyNumbers);
        const mediumNumbers = document.querySelector(".medium-count");
        mediumNumbers.textContent = `${solvedMedium}/${totalMedium}`;
        // mediumChart.appendChild(mediumNumbers);
        const hardNumbers = document.querySelector(".hard-count");
        hardNumbers.textContent = `${solvedHard}/${totalHard}`;
        // hardChart.appendChild(hardNumbers);

        // updating the chart 
        easyChart.style.setProperty("--progress-degree", `${(solvedEasy/totalEasy) * 100}%`)
        mediumChart.style.setProperty("--progress-degree", `${(solvedMedium/totalMedium) * 100}%`)
        hardChart.style.setProperty("--progress-degree", `${(solvedHard/totalHard) * 100}%`)
    }


    async function fetchData(username) {
        const search = document.getElementById("search-button");
        try {
            // Update UI for search action
            search.textContent = "Searching...";
            search.disabled = true;

            // CORS proxy (ensure it works or replace with a working one)
            const extra = 'https://cors-anywhere.herokuapp.com/';
            const url = extra + 'https://leetcode.com/graphql';

            const headers = new Headers();
            headers.append("Content-Type", "application/json");

            // GraphQL query
            const graphql = JSON.stringify({
                query: `
                query userSessionProgress($username: String!) {
                    allQuestionsCount {
                        difficulty
                        count
                    }
                    matchedUser(username: $username) {
                        submitStats {
                            acSubmissionNum {
                                difficulty
                                count
                                submissions
                            }
                            totalSubmissionNum {
                                difficulty
                                count
                                submissions
                            }
                        }
                    }
                }`,
                variables: { username }
            });

            const postRequest = {
                method: "POST",
                headers,
                body: graphql,
                redirect: "follow"
            };

            // Fetch data
            const response = await fetch(url, postRequest);

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            const result = await response.json();

             // Check if user exists
            if (!result.data.matchedUser) {
                alert("User does not exist!");
                return;
            }
            console.log(result);
            displayData(result);

        } catch (error) {
            console.error("Error fetching data:", error.message);
            alert("Error fetching data. Please try again.");
        } finally {
            // Reset UI state
            search.textContent = "Search";
            search.disabled = false;
        }
    }

    function validateUser(username) {
        if (username.trim() === "") {
            alert("Username can't be empty");
            return false;
        }

        const regx = /^[a-zA-Z0-9_-]+$/;
        if (!regx.test(username)) {
            alert("Enter a valid username");
            return false;
        }

        return true;
    }

    function getData() {
        const username = document.getElementById('searchUser').value;
        if (validateUser(username)) {
            fetchData(username);
        }
    }

    function displayResults(result) {
        // Example: Display the fetched data in the console
        console.log("Display results:", result);
        // Implement actual UI updates (e.g., populate a table or card view)
    }
});
