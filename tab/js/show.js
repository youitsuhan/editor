document.addEventListener('DOMContentLoaded', function() {
    // タブレット端末かどうかを判定
    var ua = navigator.userAgent
    var isSmartPhone = ua.indexOf('iPhone') > -1 ||
        (ua.indexOf('Android') > -1 && ua.indexOf('Mobile') > -1)
    var isTablet = !isSmartPhone && (
        ua.indexOf('iPad') > -1 ||
        (ua.indexOf('Macintosh') > -1 && 'ontouchend' in document) ||
        ua.indexOf('Android') > -1
    )
    // タブレット端末でのみ最小幅を設定
    if (isTablet) ViewportExtra.setContent({ minWidth: 1300 })
})