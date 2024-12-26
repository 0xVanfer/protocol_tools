document.addEventListener("DOMContentLoaded", function () {
    const tags = document.querySelectorAll('.tag-header');
    tags.forEach(tag => {
        tag.addEventListener('click', function () {
            const body = this.nextElementSibling;
            body.classList.toggle('show');
            tags.forEach(otherTag => {
                if (otherTag !== tag) {
                    const otherBody = otherTag.nextElementSibling;
                    otherBody.classList.remove('show');
                }
            });
        });
    });
});

document.querySelectorAll('.tag-header').forEach(tagHeader => {
    tagHeader.addEventListener('click', function () {
        const tag = this.closest('.tag');
        tag.classList.toggle('active');
        document.querySelectorAll('.tag').forEach(otherTag => {
            if (otherTag !== tag && otherTag.classList.contains('active')) {
                otherTag.classList.remove('active');
            }
        });
    });
});