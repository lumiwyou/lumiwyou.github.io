const sections = Array.from(document.querySelectorAll("main > .section"));
const nextSectionButton = document.querySelector(".next-section-button");
const nextSectionButtonLabel = nextSectionButton.querySelector(
    ".next-section-button__label"
);
const header = document.querySelector(".page-header");
let scrollUpdateScheduled = false;

function getCurrentSectionIndex() {
    const headerBottom = header.getBoundingClientRect().bottom;
    let currentIndex = 0;

    sections.forEach((section, index) => {
        if (section.getBoundingClientRect().top <= headerBottom + 1) {
            currentIndex = index;
        }
    });

    return currentIndex;
}

function updateNextSectionButton() {
    const isLastSection = getCurrentSectionIndex() >= sections.length - 1;
    nextSectionButtonLabel.textContent = isLastSection
        ? "Back to top"
        : "Next section";
    nextSectionButton.setAttribute(
        "aria-label",
        isLastSection ? "Back to top" : "Go to the next section"
    );
    nextSectionButton.classList.toggle(
        "next-section-button--top",
        isLastSection
    );
    scrollUpdateScheduled = false;
}

window.addEventListener("scroll", () => {
    if (!scrollUpdateScheduled) {
        scrollUpdateScheduled = true;
        window.requestAnimationFrame(updateNextSectionButton);
    }
}, { passive: true });

window.addEventListener("resize", updateNextSectionButton);

nextSectionButton.addEventListener("click", () => {
    const currentIndex = getCurrentSectionIndex();
    const targetSection =
        currentIndex >= sections.length - 1
            ? sections[0]
            : sections[currentIndex + 1];
    targetSection?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        block: "start"
    });
});

updateNextSectionButton();
