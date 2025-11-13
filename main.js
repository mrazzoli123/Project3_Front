'use strict';
const BASE_URL = "https://mrazzoli.pythonanywhere.com/api/v1/jokes";

async function loadjokes() {
    const langSelect = document.getElementById("selLang");
    const categorySelect = document.getElementById("selCat");
    const numberInput = document.getElementById("selNum");
    const idInput = document.getElementById("jokeId");

    let lang = langSelect.value;
    let category = categorySelect.value;
    let number = numberInput.value;
    let joke_id = idInput.value;


    if (joke_id > 0) {
        await fetch(`${BASE_URL}/${joke_id}`)
            .then(async response => {
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(errorText || `Error ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const jokeDisplay = document.getElementById("jokes");
                jokeDisplay.innerHTML = `
                <div class="box has-background-light mt-4">
                    <p class="has-text-weight-semibold">${data.joke}</p>
                </div>
                `;
            })
            .catch(error => {
                const jokeDisplay = document.getElementById("jokes");
                console.error('Error fetching joke:', error);
                jokeDisplay.innerHTML = `<p class="has-text-danger">${error.message}</p>`;
            });
    }
    else if (lang !== "" && category !== "" && number == "all") {
        await fetch(`${BASE_URL}/${lang}/${category}/all`)
            .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                    .then(data => {
                        const jokeDisplay = document.getElementById("jokes");
                        jokeDisplay.innerHTML = data.jokes
                            .map(joke => `
                                <div class="box has-background-light mt-3">
                                    <p class="has-text-centered has-text-weight-medium">${joke}</p>
                                </div>`)
                            .join("");
                    })
                    .catch(error => {
                        console.error('Error fetching jokes:', error);
                        const jokeDisplay = document.getElementById("jokes");
                        jokeDisplay.innerHTML = `<p>Error loading jokes. Please try again.</p>`;
                    });
            }
    else if (lang !== "" && category !== "" && number > 0) {
            await fetch(`${BASE_URL}/${lang}/${category}/${number}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    const jokeDisplay = document.getElementById("jokes");

                    jokeDisplay.innerHTML = data.jokes
                        .map(joke => `
                            <div class="box has-background-light mt-3">
                                <p class="has-text-centered has-text-weight-medium">${joke}</p>
                            </div>`)
                        .join("");
                })
                .catch(error => {
                    console.error('Error fetching jokes:', error);
                    const jokeDisplay = document.getElementById("jokes");
                    jokeDisplay.innerHTML = `<p>Error loading jokes. Please try again.</p>`;
                });
        }
    }