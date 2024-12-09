document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchBooks");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const books = document.querySelectorAll(".book");

  // פונקציית חיפוש
  function searchBooks(searchTerm) {
    books.forEach((book) => {
      const bookContent = book.textContent.toLowerCase();
      const isVisible = bookContent.includes(searchTerm.toLowerCase());
      book.style.display = isVisible ? "block" : "none";
    });
  }

  // פונקציית סינון לפי קטגוריה
  function filterBooks(category) {
    books.forEach((book) => {
      if (category === "all") {
        book.style.display = "block";
      } else {
        const categories = book.dataset.categories
          ? book.dataset.categories.split(",")
          : [];
        book.style.display = categories.includes(category) ? "block" : "none";
      }
    });
  }

  // האזנה לשינויים בשדה החיפוש
  searchInput.addEventListener("input", (e) => {
    searchBooks(e.target.value);
  });

  // האזנה ללחיצות על כפתורי הסינון
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // הסרת הקלאס active מכל הכפתורים
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // הוספת הקלאס active לכפתור הנוכחי
      button.classList.add("active");
      // הפעלת הסינון
      filterBooks(button.dataset.category);
    });
  });

  // פונקציה המשלבת חיפוש וסינון
  function updateVisibility() {
    const searchTerm = searchInput.value.toLowerCase();
    const activeCategory =
      document.querySelector(".filter-btn.active").dataset.category;

    books.forEach((book) => {
      const matchesSearch = book.textContent.toLowerCase().includes(searchTerm);
      const matchesCategory =
        activeCategory === "all" ||
        (book.dataset.categories &&
          book.dataset.categories.includes(activeCategory));

      book.style.display = matchesSearch && matchesCategory ? "block" : "none";
    });
  }

  // האזנה לשני האירועים עם הפונקציה המשולבת
  searchInput.addEventListener("input", updateVisibility);
  filterButtons.forEach((button) => {
    button.addEventListener("click", updateVisibility);
  });
});
