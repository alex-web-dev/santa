const analyticEvent = (...args) => {
    if (Array.isArray(window.A))
        window.A.push(args);
    else
        window.A.event.apply(window.A, args);
};

(() => {
    window.addEventListener('load', () => {
        const script = document.createElement('script');
        script.src = '/analytics.js';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script)
    })
})();

window.addEventListener('analytics_init', (e) => {
    const {Analytics} = e.detail;
    const {FirebaseWeb, YandexMetrika, SendInBlue, Amplitude} = Analytics.providerInstances;
    Analytics
        .addProvider(new FirebaseWeb())
        .addProvider(new Amplitude())
        .addProvider(new SendInBlue())
        .addProvider(LANG == 'ru' ? new YandexMetrika() : null)
        .onEvent((name, props) => {
            return {
                landing_path: location.pathname
            }
        });

    console.log('Analytics initialized');
})

window.addEventListener('load', () => {
    if (!window.A) window.A = [];

    // Visit event
    analyticEvent('landing_visit', { lang: LANG });

    // Interval event every 30 secs
    (() => {
        const intervalEventInterval = 30;
        let intervalEventAccumulator = 0;
        setInterval(() => {
            intervalEventAccumulator += intervalEventInterval
            analyticEvent('landing_timer', { lang: LANG, second: intervalEventAccumulator })
        }, intervalEventInterval * 1000);
    })();

    // Sections events
    (() => {
        document.querySelectorAll('[data-screen-name]').forEach($section => {
            const screenName = $section.dataset.screenName;
            // Scroll
            const handleScroll = () => {
                window.requestAnimationFrame(() => {
                    if (window.outerHeight >= $section.getBoundingClientRect().top + $section.scrollHeight - 30) {
                        analyticEvent('landing_screen_see', { screen: screenName })
                        window.removeEventListener('scroll', handleScroll);
                    }
                })
            };
            window.addEventListener('scroll', handleScroll);
            handleScroll();

            // elements clicks
            $section.querySelectorAll('a, button, img').forEach($el => {
                if ($el.classList.contains('faq-item__header'))
                    return;

                $el.addEventListener('click', () => {
                    const props = {
                        screen: screenName
                    };

                    if ($el.tagName === 'A' && $el.href !== '#') {
                        props.url = $el.href.replace(`${location.protocol}//${location.host}`, '');
                        props.type = 'link';
                    }

                    if ($el.classList.contains('btn'))
                        props.type = 'button';

                    if ($el.tagName === 'BUTTON')
                        props.type = 'button';

                    if ($el.tagName === 'IMG') {
                        props.type = 'img';
                        props.url = $el.src;
                    }

                    analyticEvent('landing_click', props)
                })
            })
        })
    })();

    // FAQ click
    (() => {
        document.querySelectorAll('.faq-item > button').forEach(($faq, index) => {
            $faq.addEventListener('click', () => {
                analyticEvent('landing_faq_toggle', { item: index + 1 })
            })
        });
    })();

    (() => {
        document.querySelector('.menu__toggle').addEventListener('click', () => {
            analyticEvent('navigation_menu_accordion_click');

            setTimeout(() => {
                if (document.querySelector('.menu').classList.contains('menu--active'))
                    analyticEvent('navigation_menu_see')
            });
        })
    })();
});