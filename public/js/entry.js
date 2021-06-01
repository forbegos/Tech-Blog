const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#entry-title").value;
  const content = document.querySelector("#entry-content").value;

  if (title && content) {
    const response = await fetch(`/api/entries`, {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to create entry");
    }
  }
};

document
  .querySelector(".new-entry-form")
  .addEventListener("submit", newFormHandler);
