export default function scrollToTop(scrollRef) {
    scrollRef.current.scrollToOffset({
        offset: 0,
    });
}
