//if (checkCookieConsentCookie()) {
        (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
        'gtm.start': new Date().getTime(), event: 'gtm.js'
        });
        var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
        })
        (window, document, 'script', 'dataLayer', 'GTM-NTM2KZ8');
        //}

{
          "@context": "https://schema.org",
          "@type": "Organization",
          "url": "https://www.bris.se",
          "logo": "https://www.bris.se/Static/Images/logo.png",
          "name": "Bris",
          "description": "Bris - Barnens rätt i samhället",
          "email": "info@bris.se",
          "telephone": "+46-8-598 888 00",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Sankt Eriksgatan 113",
            "addressLocality": "Stockholm",
            "addressCountry": "SE",
            "postalCode": "11343"
          },
          "vatID": "802013-3420",
        }

$(document).ready(function () {
        var partialFormId = '#desktopSearchInput';

        $('.bi-x-circle').on("click", function (event) {
            clearSearchResult();
        });

        $(partialFormId + ' #searchForm').submit(function(event) {
            event.preventDefault();
            showSearch(event);
            var query = $('#desktopSearchInput input[type="text"]').val();

            toggleSearchLoadingIndicator();
            copySearchQueryToAllSearchInputs(query);
            $('.search-result').each(function () {
                $(this).empty();
            });
            $.ajax({
                url: '/sok/' + 'light',
                method: 'POST',
                contentType: 'application/x-www-form-urlencoded',
                data: { q: query },
                success: function (response) {
                    $(".overlay").removeClass("d-none");
                    if (response && response.hits && response.hits.length) {
                        var groupedHits = groupBy(response.hits, 'category');

                        for (var category in groupedHits) {
                            $('.search-result').each(function () {
                                let searchResultElem = this;
                                $(searchResultElem).append($('<li class="category-header"></li>').text(category));

                                groupedHits[category].forEach(function (hit) {
                                    var highlightedTitle = highlightMatch(hit.title, query);
                                    var $listItem = $('<li class="search-hit"></li>');
                                    var $link = $('<a></a>').attr('href', hit.url).html("<span>" + highlightedTitle + "</span>");

                                    if (hit.thumbnail) {
                                        var $image = $('<img />').attr('src', hit.thumbnail).on('error', function () {
                                            // Handle image load error, e.g., replace with a placeholder image
                                            $(this).attr('src', 'path/to/placeholder-image.jpg');
                                        });
                                        $link.append($image);
                                    }

                                    $listItem.append($link);
                                    $(searchResultElem).append($listItem);
                                });
                            });
                        }
                    }
                    else {
                        $('.search-result').each(function () {
                            let searchResultElem = this;
                            var $listItem = $('<li class="search-hit"></li>');
                            var $link = $('<a></a>').html("<span>Inga sökträffar</span>");
                            $listItem.append($link);
                            $(searchResultElem).append($listItem);
                        });
                    }
                },
                error: function (xhr, status, error) {
                    $('.search-result').each(function () {
                        let searchResultElem = this;
                        var $listItem = $('<li class="search-hit"></li>');
                        var $link = $('<a></a>').html("<span>Inga sökträffar</span>");
                        $listItem.append($link);
                        $(searchResultElem).append($listItem);
                    });
                },
                complete: function () {
                    toggleSearchLoadingIndicator();
                }
            });

        });
    });

    function submitSearchForm() {
        $('#desktopSearchInput').find('form').submit();
    }

    function highlightMatch(text, query) {
        // Create a regex that looks for words that contain the query
        var re = new RegExp("\\b\\w*" + escapeRegExp(query) + "\\w*\\b", "gi");
        return text.replace(re, '<strong>$&</strong>');
    }

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escapes special characters for regex
    }

    function groupBy(array, property) {
        return array.reduce(function (accumulator, item) {
            var key = item[property];
            if (!accumulator[key]) {
                accumulator[key] = [];
            }
            accumulator[key].push(item);
            return accumulator;
        }, {});
    }

$(document).ready(function () {
        var partialFormId = '#mobileSearchInput';

        $('.bi-x-circle').on("click", function (event) {
            clearSearchResult();
        });

        $(partialFormId + ' #searchForm').submit(function(event) {
            event.preventDefault();
            showSearch(event);
            var query = $('#mobileSearchInput input[type="text"]').val();

            toggleSearchLoadingIndicator();
            copySearchQueryToAllSearchInputs(query);
            $('.search-result').each(function () {
                $(this).empty();
            });
            $.ajax({
                url: '/sok/' + 'light',
                method: 'POST',
                contentType: 'application/x-www-form-urlencoded',
                data: { q: query },
                success: function (response) {
                    $(".overlay").removeClass("d-none");
                    if (response && response.hits && response.hits.length) {
                        var groupedHits = groupBy(response.hits, 'category');

                        for (var category in groupedHits) {
                            $('.search-result').each(function () {
                                let searchResultElem = this;
                                $(searchResultElem).append($('<li class="category-header"></li>').text(category));

                                groupedHits[category].forEach(function (hit) {
                                    var highlightedTitle = highlightMatch(hit.title, query);
                                    var $listItem = $('<li class="search-hit"></li>');
                                    var $link = $('<a></a>').attr('href', hit.url).html("<span>" + highlightedTitle + "</span>");

                                    if (hit.thumbnail) {
                                        var $image = $('<img />').attr('src', hit.thumbnail).on('error', function () {
                                            // Handle image load error, e.g., replace with a placeholder image
                                            $(this).attr('src', 'path/to/placeholder-image.jpg');
                                        });
                                        $link.append($image);
                                    }

                                    $listItem.append($link);
                                    $(searchResultElem).append($listItem);
                                });
                            });
                        }
                    }
                    else {
                        $('.search-result').each(function () {
                            let searchResultElem = this;
                            var $listItem = $('<li class="search-hit"></li>');
                            var $link = $('<a></a>').html("<span>Inga sökträffar</span>");
                            $listItem.append($link);
                            $(searchResultElem).append($listItem);
                        });
                    }
                },
                error: function (xhr, status, error) {
                    $('.search-result').each(function () {
                        let searchResultElem = this;
                        var $listItem = $('<li class="search-hit"></li>');
                        var $link = $('<a></a>').html("<span>Inga sökträffar</span>");
                        $listItem.append($link);
                        $(searchResultElem).append($listItem);
                    });
                },
                complete: function () {
                    toggleSearchLoadingIndicator();
                }
            });

        });
    });

    function submitSearchForm() {
        $('#mobileSearchInput').find('form').submit();
    }

    function highlightMatch(text, query) {
        // Create a regex that looks for words that contain the query
        var re = new RegExp("\\b\\w*" + escapeRegExp(query) + "\\w*\\b", "gi");
        return text.replace(re, '<strong>$&</strong>');
    }

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escapes special characters for regex
    }

    function groupBy(array, property) {
        return array.reduce(function (accumulator, item) {
            var key = item[property];
            if (!accumulator[key]) {
                accumulator[key] = [];
            }
            accumulator[key].push(item);
            return accumulator;
        }, {});
    }

$(document).ready(function () {

        isIframeDesign = checkIfIframeDesign();
        if (isIframeDesign === true) {
            $("#header-top").addClass("d-none");
            $("#header-bottom").addClass("d-none");
            $("#mobileSearchContainer").addClass("d-none");
            $('.page').css('padding-top', '0');
        }

        //Change dropdown icon
        $('#dropdownAccountMenuButton').on("click", function (event) {
            event.stopPropagation();
            openAccountMenu(event);
            //closeAccountMenu(event, true);
        });

        //Logic for hiding the header on scroll
        var lastScrollTop = 0;
        var threshold = 50;
        var bottomBuffer = 120;

        $(window).on('scroll', function () {
            if (window.innerWidth <= 768) {
                var currentScrollTop = $(this).scrollTop();
                var isNearBottom = $(document).height() - (currentScrollTop + $(window).height()) < bottomBuffer;
                let menuIsHidden = $(".menu-container").hasClass("d-none");
                setBodyOverflowHidden(!menuIsHidden);

                if (currentScrollTop > lastScrollTop && currentScrollTop > threshold && !isNearBottom && menuIsHidden) {
                    $("#header-top").addClass('hidden');
                    $('.page').addClass('with-hidden-header');
                } else if (currentScrollTop + bottomBuffer < lastScrollTop || !isNearBottom) {
                    $("#header-top").removeClass('hidden');
                    $('.page').removeClass('with-hidden-header');
                }
                lastScrollTop = currentScrollTop;
            }
            else {
                $("#header-top").removeClass('hidden');
                $('.page').removeClass('with-hidden-header');
            }
        });
    });

$(document).ready(function () {

        $("#desktopMenuToggleButton, #mobileMenuToggleButton").click(function (event) {
            let menuIsClosed = $(".menu-container").hasClass('d-none');

            if (menuIsClosed) {
                openMenu(event);
            } else {
                closeMenu(event, true);
            }

            event.stopPropagation();
        });

        $('.menu-container').on('click', function (event) {
            event.stopPropagation();
        });

    });

(function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date(); a = s.createElement(o),
            m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
            })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

            ga('create', 'UA-59303161-1', 'auto');
            ga('send', 'pageview');
            ga('set', 'anonymizeIp', true);

$(document).ready(function () {
        var carousel = new bootstrap.Carousel('#carousel_d0d120fb693d4888bff8f7692782dc6b', {
            touch: true,
            pause: false,
            interval: 30000,
        });

        window.carousels = window.carousels || {};
        window.carousels['carousel_d0d120fb693d4888bff8f7692782dc6b'] = carousel;
    });

    $(document).ready(function() {

        $('#carousel_d0d120fb693d4888bff8f7692782dc6b').on('slid.bs.carousel', function (e) {
        var activeIndex = $(e.relatedTarget).index();

        $('#carousel_d0d120fb693d4888bff8f7692782dc6b' + ' .bris-carousel-indicators a').removeClass('active')
            .eq(activeIndex).addClass('active');
        });

        $('#carousel_d0d120fb693d4888bff8f7692782dc6b' + ' .bris-carousel-indicators a').on('click', function () {
            // Remove active class from all indicators
            $('#carousel_d0d120fb693d4888bff8f7692782dc6b' + ' .bris-carousel-indicators a').removeClass('active');
            // Add active class to the clicked indicator
            $(this).addClass('active');
        });
    });

$(document).ready(function () {
            $('#carousel_d0d120fb693d4888bff8f7692782dc6b' + ' .carousel-play-toggle').click(function () {
                if ($('#pauseIcon').is(':visible')) {
                    $('#pauseIcon').addClass('d-none');
                    $('#playIcon').removeClass('d-none');
                    window.carousels['carousel_d0d120fb693d4888bff8f7692782dc6b'].pause();
                } else {
                    $('#carousel_d0d120fb693d4888bff8f7692782dc6b').carousel('cycle');
                    $('#pauseIcon').removeClass('d-none');
                    $('#playIcon').addClass('d-none');
                    window.carousels['carousel_d0d120fb693d4888bff8f7692782dc6b']._config['interval'] = 30000;

                }
            });
        });

$(document).ready(function () {
            if (!$("#breadcrumbWrapper .breadcrumb-item").length) {
                $("#breadcrumbWrapper").hide();
            }
        });

var voteBlockIdSelector = '#17016';
    $(document).ready(function () {
        var voteBlockId = "17016";
        var currentURL = new URL(window.location.href);
        window.baseURL = currentURL.origin + currentURL.pathname;

        if (sessionStorage.getItem('hasVoted-' + voteBlockId)) {
            $(voteBlockIdSelector + ' input[type=radio]').prop('disabled', true);
            getVotes(voteBlockId);

            var selectedOption = sessionStorage.getItem('selectedOption-' + voteBlockId);
            if (selectedOption) {
                let radioButton = $(voteBlockIdSelector + ' input[type=radio][value="' + selectedOption + '"]');
                $(radioButton).prop('checked', true);
                $(radioButton).closest('.hiqvoteblock-content-alternative').addClass('picked');
            }
            else {
                $(radioButton).closest('.hiqvoteblock-content-alternative').addClass('not-picked');
            }

            return;
        }

        $(voteBlockIdSelector + ' input[type=radio]').on('change', function () {
            $('.show-votes-link').addClass('hidden');
            let selectedOption = $(this).val();
            if (sessionStorage.getItem('hasVoted-' + voteBlockId)) {
                return;
            }

            var castVoteUrl = window.location.origin + '/Helper/CastVote';

            $.ajax({
                url: castVoteUrl,
                method: 'POST',
                data: {
                    blockId: voteBlockId,
                    alternativeId: selectedOption
                }
            })
            .done(function(response) {
                if (response.success) {
                    sessionStorage.setItem('hasVoted-' + voteBlockId, 'true');
                    sessionStorage.setItem('selectedOption-' + voteBlockId, selectedOption);
                    $(voteBlockIdSelector + ' input[type=radio]').prop('disabled', true);
                    getVotes(voteBlockId);
                }
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                console.error("AJAX Error: ", textStatus, errorThrown);
            });
        });
    });

    function updateProgressBars(voteData, allowVoteAfterVotesAreFetched) {
        var totalVotes = voteData.reduce((acc, vote) => acc + vote.count, 0);

        // Update the total votes in the HTML
        $('.hiqvoteblock-content .total-votes-count').text(totalVotes);
        $('.hiqvoteblock-content .total-votes').removeClass('hidden');

        voteData.sort((a, b) => b.Count - a.Count);

        voteData.forEach(function (vote) {
            var percentage = totalVotes === 0 ? 0 : (vote.count / totalVotes) * 100;

            // Find the progress bar and update it
            var progressBar = $(voteBlockIdSelector + ' div[data-alternative-id="' + vote.option + '"] .progress-bar');
            progressBar.css('width', percentage + '%')
                .attr('aria-valuenow', percentage);

            progressBar.parent().next('.progress-text').remove(); // Remove any existing sibling text
            progressBar.parent().after('<span class="progress-text">' + percentage.toFixed(0) + '%</span>'); // Add new text

            // Ensure the progress bar's container is visible
            progressBar.closest('.progress').removeClass('d-none');

            // Update classes for picked and not-picked
            if (!allowVoteAfterVotesAreFetched) {
                if (sessionStorage.getItem('selectedOption-' + '17016') == vote.option) {
                    progressBar.closest('.hiqvoteblock-content-alternative').addClass('picked');
                } else {
                    progressBar.closest('.hiqvoteblock-content-alternative').addClass('not-picked');
                }
            }

            // Move the DOM element to rearrange based on the sorted order
            var alternativeElement = progressBar.closest('.hiqvoteblock-content-alternative'); // Find the alternative container
            alternativeElement.parent().append(alternativeElement); // Move it to the end of the parent container
        });
    }

    function removeVotesWithoutMatchingOption(response) {
        var alternativeIDs = new Set();

        // Collect all alternative IDs from the page
        $(voteBlockIdSelector + ' div.progress').each(function () {
            var alternativeID = $(this).data('alternative-id');
            if (alternativeID) {
                alternativeIDs.add(alternativeID.toString()); // Convert to string if necessary
            }
        });

        var distinctAlternativeIDs = Array.from(alternativeIDs);


        // Filter the response and keep only those with matching IDs
        var filteredResponse = response.filter(function (item) {
            return distinctAlternativeIDs.includes(item.option.toString()); // Convert to string if necessary
        });

        // Add alternatives with 0 votes
        distinctAlternativeIDs.forEach(function (id) {
            if (!filteredResponse.some(item => item.option.toString() === id)) {
                filteredResponse.push({ option: id, count: 0 });
            }
        });


        return filteredResponse;
    }

    function getVotes(blockId, allowVoteAfterVotesAreFetched) {
        $('.show-votes-link').addClass('hidden');

        var getVotesUrl = window.location.origin + '/Helper/GetVotes';

        $.ajax({
            url: getVotesUrl,
            method: 'GET', // Use 'method' instead of 'type' (modern syntax)
            data: { blockId: blockId }
        })
        .done(function(response) {
            var filteredResponse = removeVotesWithoutMatchingOption(response);
            updateProgressBars(filteredResponse, allowVoteAfterVotesAreFetched);
        })
        .fail(function(xhr, status, error) {
            console.error("Error fetching votes: ", error);
        });
    }

$(document).ready(function () {

        function setMinWidthForWrapper() {
            $("#ca97ea71-8ca1-4fec-8d88-d2ff300addef" + ' .sliding-image-wrapper > div').each(function () {
                var totalWidth = 0;
                $(this).find('.sliding-image').each(function () {
                    totalWidth += $(this).outerWidth(true); // true includes margin
                });
                $(this).css('min-width', totalWidth + 'px'); // Set the min-width of the wrapper
                $(this).parent().css('min-width', (totalWidth * 2) + 'px'); // Set the min-width of the wrapper
            });
        }

        // Call the function on document ready
        setMinWidthForWrapper();

        // Call the function on window resize
        $(window).resize(function () {
            setMinWidthForWrapper();
        });

        const $imageWrappers = $('.sliding-image-wrapper > div');

        $("#ca97ea71-8ca1-4fec-8d88-d2ff300addef").click(function () {
            $($imageWrappers).toggleClass("animation-paused");
            $(this).find('.bi-pause-circle').toggleClass("d-none");
            $(this).find('.bi-play-circle').toggleClass("d-none");
        });

    });

function handleCTAClick(event, buttonLink, wholeCTAClickable) {
        // Check if the target is an anchor tag
        if (event.target.tagName === 'A') {
            return;
        }

        // Check if the target is inside .audio-player or .video-player
        if ($(event.target).closest('.audio-player').length === 0 && $(event.target).closest('.video-player').length === 0) {
            // Proceed with the redirection if the click is not on audio/video player
            if ((wholeCTAClickable == 'true' || wholeCTAClickable == true) && buttonLink != null) {
                event.preventDefault(); // Prevent default behavior
                event.stopPropagation(); // Stop event propagation
                window.location.href = buttonLink;
            }
        }
    }

$(document).ready(function() {
            var uniqueId = "#b3b99d9a-a400-41f8-9f43-cffe06861bae";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
            var linkColor = 'WHITE'; // This also uses Razor syntax to inject a color value

            $(uniqueId + ' .cta-description a').each(function() {
                $(this).css('color', linkColor); // This sets the color of the links
            });
        });

function handleCTAClick(event, buttonLink, wholeCTAClickable) {
        // Check if the target is an anchor tag
        if (event.target.tagName === 'A') {
            return;
        }

        // Check if the target is inside .audio-player or .video-player
        if ($(event.target).closest('.audio-player').length === 0 && $(event.target).closest('.video-player').length === 0) {
            // Proceed with the redirection if the click is not on audio/video player
            if ((wholeCTAClickable == 'true' || wholeCTAClickable == true) && buttonLink != null) {
                event.preventDefault(); // Prevent default behavior
                event.stopPropagation(); // Stop event propagation
                window.location.href = buttonLink;
            }
        }
    }

$(document).ready(function() {
            var uniqueId = "#1c1d19d2-bc6d-499f-bcf8-9b5800e32641";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
            var linkColor = '#FFFFFF'; // This also uses Razor syntax to inject a color value

            $(uniqueId + ' .cta-description a').each(function() {
                $(this).css('color', linkColor); // This sets the color of the links
            });
        });

function handleCTAClick(event, buttonLink, wholeCTAClickable) {
        // Check if the target is an anchor tag
        if (event.target.tagName === 'A') {
            return;
        }

        // Check if the target is inside .audio-player or .video-player
        if ($(event.target).closest('.audio-player').length === 0 && $(event.target).closest('.video-player').length === 0) {
            // Proceed with the redirection if the click is not on audio/video player
            if ((wholeCTAClickable == 'true' || wholeCTAClickable == true) && buttonLink != null) {
                event.preventDefault(); // Prevent default behavior
                event.stopPropagation(); // Stop event propagation
                window.location.href = buttonLink;
            }
        }
    }

$(document).ready(function() {
            var uniqueId = "#398f12cc-f250-48d0-baff-5015a7a51842";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
            var linkColor = '#FFFFFF'; // This also uses Razor syntax to inject a color value

            $(uniqueId + ' .cta-description a').each(function() {
                $(this).css('color', linkColor); // This sets the color of the links
            });
        });

function handleCTAClick(event, buttonLink, wholeCTAClickable) {
        // Check if the target is an anchor tag
        if (event.target.tagName === 'A') {
            return;
        }

        // Check if the target is inside .audio-player or .video-player
        if ($(event.target).closest('.audio-player').length === 0 && $(event.target).closest('.video-player').length === 0) {
            // Proceed with the redirection if the click is not on audio/video player
            if ((wholeCTAClickable == 'true' || wholeCTAClickable == true) && buttonLink != null) {
                event.preventDefault(); // Prevent default behavior
                event.stopPropagation(); // Stop event propagation
                window.location.href = buttonLink;
            }
        }
    }

$(document).ready(function() {
            var uniqueId = "#e3f6f822-1d01-4b8d-81df-61cb3fe8f1c3";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
            var linkColor = '#FFFFFF'; // This also uses Razor syntax to inject a color value

            $(uniqueId + ' .cta-description a').each(function() {
                $(this).css('color', linkColor); // This sets the color of the links
            });
        });

function handleCTAClick(event, buttonLink, wholeCTAClickable) {
        // Check if the target is an anchor tag
        if (event.target.tagName === 'A') {
            return;
        }

        // Check if the target is inside .audio-player or .video-player
        if ($(event.target).closest('.audio-player').length === 0 && $(event.target).closest('.video-player').length === 0) {
            // Proceed with the redirection if the click is not on audio/video player
            if ((wholeCTAClickable == 'true' || wholeCTAClickable == true) && buttonLink != null) {
                event.preventDefault(); // Prevent default behavior
                event.stopPropagation(); // Stop event propagation
                window.location.href = buttonLink;
            }
        }
    }

$(document).ready(function() {
            var uniqueId = "#7e36aab3-978d-4108-8514-3841992f324f";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
            var linkColor = '#FFFFFF'; // This also uses Razor syntax to inject a color value

            $(uniqueId + ' .cta-description a').each(function() {
                $(this).css('color', linkColor); // This sets the color of the links
            });
        });

function handleCTAClick(event, buttonLink, wholeCTAClickable) {
        // Check if the target is an anchor tag
        if (event.target.tagName === 'A') {
            return;
        }

        // Check if the target is inside .audio-player or .video-player
        if ($(event.target).closest('.audio-player').length === 0 && $(event.target).closest('.video-player').length === 0) {
            // Proceed with the redirection if the click is not on audio/video player
            if ((wholeCTAClickable == 'true' || wholeCTAClickable == true) && buttonLink != null) {
                event.preventDefault(); // Prevent default behavior
                event.stopPropagation(); // Stop event propagation
                window.location.href = buttonLink;
            }
        }
    }

$(document).ready(function() {
            var uniqueId = "#f226e75a-a406-46bc-af95-af95efe93788";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
            var linkColor = '#FFFFFF'; // This also uses Razor syntax to inject a color value

            $(uniqueId + ' .cta-description a').each(function() {
                $(this).css('color', linkColor); // This sets the color of the links
            });
        });

function handleCTAClick(event, buttonLink, wholeCTAClickable) {
        // Check if the target is an anchor tag
        if (event.target.tagName === 'A') {
            return;
        }

        // Check if the target is inside .audio-player or .video-player
        if ($(event.target).closest('.audio-player').length === 0 && $(event.target).closest('.video-player').length === 0) {
            // Proceed with the redirection if the click is not on audio/video player
            if ((wholeCTAClickable == 'true' || wholeCTAClickable == true) && buttonLink != null) {
                event.preventDefault(); // Prevent default behavior
                event.stopPropagation(); // Stop event propagation
                window.location.href = buttonLink;
            }
        }
    }

$(document).ready(function() {
            var uniqueId = "#848a64fa-c7ac-477d-8255-8e53052acc6b";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
            var linkColor = '#007565'; // This also uses Razor syntax to inject a color value

            $(uniqueId + ' .cta-description a').each(function() {
                $(this).css('color', linkColor); // This sets the color of the links
            });
        });

function handleCTAClick(event, buttonLink, wholeCTAClickable) {
        // Check if the target is an anchor tag
        if (event.target.tagName === 'A') {
            return;
        }

        // Check if the target is inside .audio-player or .video-player
        if ($(event.target).closest('.audio-player').length === 0 && $(event.target).closest('.video-player').length === 0) {
            // Proceed with the redirection if the click is not on audio/video player
            if ((wholeCTAClickable == 'true' || wholeCTAClickable == true) && buttonLink != null) {
                event.preventDefault(); // Prevent default behavior
                event.stopPropagation(); // Stop event propagation
                window.location.href = buttonLink;
            }
        }
    }

$(document).ready(function() {
            var uniqueId = "#c3727200-0937-4310-a8e4-79ca2b4e2088";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
            var linkColor = '#FFFFFF'; // This also uses Razor syntax to inject a color value

            $(uniqueId + ' .cta-description a').each(function() {
                $(this).css('color', linkColor); // This sets the color of the links
            });
        });

function handleCTAClick(event, buttonLink, wholeCTAClickable) {
        // Check if the target is an anchor tag
        if (event.target.tagName === 'A') {
            return;
        }

        // Check if the target is inside .audio-player or .video-player
        if ($(event.target).closest('.audio-player').length === 0 && $(event.target).closest('.video-player').length === 0) {
            // Proceed with the redirection if the click is not on audio/video player
            if ((wholeCTAClickable == 'true' || wholeCTAClickable == true) && buttonLink != null) {
                event.preventDefault(); // Prevent default behavior
                event.stopPropagation(); // Stop event propagation
                window.location.href = buttonLink;
            }
        }
    }

$(document).ready(function() {
            var uniqueId = "#2df92e6a-0c5d-43a7-8f21-2d5a237a754b";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
            var linkColor = '#FFFFFF'; // This also uses Razor syntax to inject a color value

            $(uniqueId + ' .cta-description a').each(function() {
                $(this).css('color', linkColor); // This sets the color of the links
            });
        });

$(document).ready(function () {

        var paginator = new SideScrollPaginator("#block_ca66b71c7e69496898dd647a6e7b7f6d");
    });

    function giveAllCTACardsTheSameHeight(sidescrollId) {
        var maxHeight = 0;

        $(".hiqsidescrollblock " + sidescrollId + " .block-list .cta-card").each(function () {
            var outerHeight = $(this).outerHeight(true); // true to include margin
            if (outerHeight > maxHeight) {
                maxHeight = outerHeight;
            }
        });

        $(".hiqsidescrollblock " + sidescrollId + " .block-list .cta-card").each(function () {
            var paddingBorder = $(this).outerHeight() - $(this).height();
            $(this).height(maxHeight - paddingBorder);
        });
    }

$(document).ready(function () {

        function setMinWidthForWrapper() {
            $("#523a37c3-1ae9-486d-bb08-6263f758a7df" + ' .sliding-image-wrapper > div').each(function () {
                var totalWidth = 0;
                $(this).find('.sliding-image').each(function () {
                    totalWidth += $(this).outerWidth(true); // true includes margin
                });
                $(this).css('min-width', totalWidth + 'px'); // Set the min-width of the wrapper
                $(this).parent().css('min-width', (totalWidth * 2) + 'px'); // Set the min-width of the wrapper
            });
        }

        // Call the function on document ready
        setMinWidthForWrapper();

        // Call the function on window resize
        $(window).resize(function () {
            setMinWidthForWrapper();
        });

        const $imageWrappers = $('.sliding-image-wrapper > div');

        $("#523a37c3-1ae9-486d-bb08-6263f758a7df").click(function () {
            $($imageWrappers).toggleClass("animation-paused");
            $(this).find('.bi-pause-circle').toggleClass("d-none");
            $(this).find('.bi-play-circle').toggleClass("d-none");
        });

    });

function handleCTAClick(event, buttonLink, wholeCTAClickable) {
        // Check if the target is an anchor tag
        if (event.target.tagName === 'A') {
            return;
        }

        // Check if the target is inside .audio-player or .video-player
        if ($(event.target).closest('.audio-player').length === 0 && $(event.target).closest('.video-player').length === 0) {
            // Proceed with the redirection if the click is not on audio/video player
            if ((wholeCTAClickable == 'true' || wholeCTAClickable == true) && buttonLink != null) {
                event.preventDefault(); // Prevent default behavior
                event.stopPropagation(); // Stop event propagation
                window.location.href = buttonLink;
            }
        }
    }

$(document).ready(function() {
            var uniqueId = "#55bf51ce-e73e-4e99-a93b-ad72354ff388";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
            var linkColor = '#FFFFFF'; // This also uses Razor syntax to inject a color value

            $(uniqueId + ' .cta-description a').each(function() {
                $(this).css('color', linkColor); // This sets the color of the links
            });
        });

function handleCTAClick(event, buttonLink, wholeCTAClickable) {
        // Check if the target is an anchor tag
        if (event.target.tagName === 'A') {
            return;
        }

        // Check if the target is inside .audio-player or .video-player
        if ($(event.target).closest('.audio-player').length === 0 && $(event.target).closest('.video-player').length === 0) {
            // Proceed with the redirection if the click is not on audio/video player
            if ((wholeCTAClickable == 'true' || wholeCTAClickable == true) && buttonLink != null) {
                event.preventDefault(); // Prevent default behavior
                event.stopPropagation(); // Stop event propagation
                window.location.href = buttonLink;
            }
        }
    }

$(document).ready(function() {
            var uniqueId = "#c4e38c7f-3c5c-4ad0-b1ab-74974a411b3b";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
            var linkColor = '#FFFFFF'; // This also uses Razor syntax to inject a color value

            $(uniqueId + ' .cta-description a').each(function() {
                $(this).css('color', linkColor); // This sets the color of the links
            });
        });

function handleCTAClick(event, buttonLink, wholeCTAClickable) {
        // Check if the target is an anchor tag
        if (event.target.tagName === 'A') {
            return;
        }

        // Check if the target is inside .audio-player or .video-player
        if ($(event.target).closest('.audio-player').length === 0 && $(event.target).closest('.video-player').length === 0) {
            // Proceed with the redirection if the click is not on audio/video player
            if ((wholeCTAClickable == 'true' || wholeCTAClickable == true) && buttonLink != null) {
                event.preventDefault(); // Prevent default behavior
                event.stopPropagation(); // Stop event propagation
                window.location.href = buttonLink;
            }
        }
    }

$(document).ready(function() {
            var uniqueId = "#35ae81f7-a9d7-40e3-90e4-8d4b2036b846";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
            var linkColor = '#FFFFFF'; // This also uses Razor syntax to inject a color value

            $(uniqueId + ' .cta-description a').each(function() {
                $(this).css('color', linkColor); // This sets the color of the links
            });
        });

function handleCTAClick(event, buttonLink, wholeCTAClickable) {
        // Check if the target is an anchor tag
        if (event.target.tagName === 'A') {
            return;
        }

        // Check if the target is inside .audio-player or .video-player
        if ($(event.target).closest('.audio-player').length === 0 && $(event.target).closest('.video-player').length === 0) {
            // Proceed with the redirection if the click is not on audio/video player
            if ((wholeCTAClickable == 'true' || wholeCTAClickable == true) && buttonLink != null) {
                event.preventDefault(); // Prevent default behavior
                event.stopPropagation(); // Stop event propagation
                window.location.href = buttonLink;
            }
        }
    }

$(document).ready(function() {
            var uniqueId = "#18daae1c-b6be-4d0b-bd26-3a5729507f25";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
            var linkColor = '#FFFFFF'; // This also uses Razor syntax to inject a color value

            $(uniqueId + ' .cta-description a').each(function() {
                $(this).css('color', linkColor); // This sets the color of the links
            });
        });

function handleCTAClick(event, buttonLink, wholeCTAClickable) {
        // Check if the target is an anchor tag
        if (event.target.tagName === 'A') {
            return;
        }

        // Check if the target is inside .audio-player or .video-player
        if ($(event.target).closest('.audio-player').length === 0 && $(event.target).closest('.video-player').length === 0) {
            // Proceed with the redirection if the click is not on audio/video player
            if ((wholeCTAClickable == 'true' || wholeCTAClickable == true) && buttonLink != null) {
                event.preventDefault(); // Prevent default behavior
                event.stopPropagation(); // Stop event propagation
                window.location.href = buttonLink;
            }
        }
    }

$(document).ready(function() {
            var uniqueId = "#c7a1b29d-57d1-49be-b874-6528d204d641";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
            var linkColor = '#222222'; // This also uses Razor syntax to inject a color value

            $(uniqueId + ' .cta-description a').each(function() {
                $(this).css('color', linkColor); // This sets the color of the links
            });
        });

function handleCTAClick(event, buttonLink, wholeCTAClickable) {
        // Check if the target is an anchor tag
        if (event.target.tagName === 'A') {
            return;
        }

        // Check if the target is inside .audio-player or .video-player
        if ($(event.target).closest('.audio-player').length === 0 && $(event.target).closest('.video-player').length === 0) {
            // Proceed with the redirection if the click is not on audio/video player
            if ((wholeCTAClickable == 'true' || wholeCTAClickable == true) && buttonLink != null) {
                event.preventDefault(); // Prevent default behavior
                event.stopPropagation(); // Stop event propagation
                window.location.href = buttonLink;
            }
        }
    }

$(document).ready(function() {
            var uniqueId = "#d5d38510-d45a-4228-8b3d-874f76c2ecc8";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
            var linkColor = '#FFFFFF'; // This also uses Razor syntax to inject a color value

            $(uniqueId + ' .cta-description a').each(function() {
                $(this).css('color', linkColor); // This sets the color of the links
            });
        });

$(document).ready(function () {

        var paginator = new SideScrollPaginator("#block_aea6d4c650684578b95409fa434a4723");
    });

    function giveAllCTACardsTheSameHeight(sidescrollId) {
        var maxHeight = 0;

        $(".hiqsidescrollblock " + sidescrollId + " .block-list .cta-card").each(function () {
            var outerHeight = $(this).outerHeight(true); // true to include margin
            if (outerHeight > maxHeight) {
                maxHeight = outerHeight;
            }
        });

        $(".hiqsidescrollblock " + sidescrollId + " .block-list .cta-card").each(function () {
            var paddingBorder = $(this).outerHeight() - $(this).height();
            $(this).height(maxHeight - paddingBorder);
        });
    }

$(document).ready(function () {
            var slussenSteps = $('.slussen-step');
            var stepHistory = [];
            var currentStepIndex = 0;

            slussenSteps.hide().removeClass('visible'); // Hide all steps and remove 'visible' class initially
            slussenSteps.find("input[type='radio']").change(function () {
                enableNextButtonIfOptionSelected();
            });

            function navigateToStep(stepIndex) {
                slussenSteps.hide().removeClass('visible'); // Hide all steps and remove 'visible' class
                slussenSteps.eq(stepIndex).show().addClass('visible'); // Show and add 'visible' class to the current step
            }

            function enableNextButtonIfOptionSelected() {
                var selectedRadio = slussenSteps.eq(currentStepIndex).find("input[type='radio']:checked");
                var isFinalStep = false;
                $('#slussen-next-button').prop('disabled', selectedRadio.length === 0 && !isFinalStep);
            }

            function enableOrDisablePreviousButton() {
                $('#slussen-previous-button').prop('disabled', currentStepIndex < 1);
            }

            function updateButtonVisibility() {
                var currentStep = slussenSteps.eq(currentStepIndex);
                var hasRadioButtons = currentStep.find("input[type='radio']").length > 0;
                var defaultLink = currentStep.data('defaultlink');
                var desktopLink = currentStep.data('desktoplink');

                if (!desktopLink)
                    desktopLink = defaultLink;

                var mobileLink = currentStep.data('mobilelink') || defaultLink; // Fallback to desktop link if mobile link is not available
                var linkText = currentStep.data('linktext') || "Nästa"; // Fallback to default text if link text is not available

                if (!hasRadioButtons && desktopLink) { // This is a final step and link exists
                    $('#slussen-next-button').hide();
                    $('#slussen-end-desktop-button').show().attr('href', desktopLink).text(linkText);
                    $('#slussen-end-mobile-button').show().attr('href', mobileLink).text(linkText);
                    $('#slussen-end-desktop-button').parent().removeClass('d-none');
                } else { // Not a final step
                    $('#slussen-next-button').show();
                    $('#slussen-end-desktop-button').hide();
                    $('#slussen-end-mobile-button').hide();
                    $('#slussen-end-desktop-button').parent().addClass('d-none');
                }
            }

            //function adjustModalBodyHeight() {
            //    var headerHeight = $('.modal-header').outerHeight(true); // includes margin
            //    var footerHeight = $('.modal-footer').outerHeight(true); // includes margin
            //    var maxHeight = $(window).height() - headerHeight - footerHeight;

            //    $('.modal-body').css('max-height', maxHeight + 'px');
            //}



            $('#slussen-next-button').click(function () {
                var selectedRadio = slussenSteps.eq(currentStepIndex).find("input[type='radio']:checked");
                stepHistory.push(currentStepIndex);

                var nextStepKey = selectedRadio.val();
                var nextStepIndex = slussenSteps.index($(`#${nextStepKey}`));

                console.log("next step", nextStepKey);

                if (nextStepIndex !== -1) {
                    currentStepIndex = nextStepIndex;
                    navigateToStep(currentStepIndex);
                    enableNextButtonIfOptionSelected();
                    enableOrDisablePreviousButton();
                    updateButtonVisibility();
                }
            });

            $('#slussen-previous-button').click(function () {
                if (stepHistory.length > 0) {
                    currentStepIndex = stepHistory.pop(); // Get the last step from the history
                    navigateToStep(currentStepIndex);
                    enableNextButtonIfOptionSelected();
                    enableOrDisablePreviousButton();
                    updateButtonVisibility();
                }
            });

            window.openSlussen = function () {
                executeAllModalsAndMenuCloseFunctions();
                $('#slussenModal').modal('show');
                navigateToStep(currentStepIndex); // Ensure the current step is visible when modal opens
            };

            //$('#slussenModal').on('shown.bs.modal', function () {
            //    adjustModalBodyHeight();
            //});

            //$(window).on('resize', function () {
            //    if ($('#slussenModal').is(':visible')) {
            //        adjustModalBodyHeight();
            //    }
            //});

            navigateToStep(0); // Set the first step as visible on initial load
            enableNextButtonIfOptionSelected();
            enableOrDisablePreviousButton();
            updateButtonVisibility();
        });

        document.addEventListener('DOMContentLoaded', (event) => {
            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
            var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl)
            });

            updateMoreInfoIconColor();

        });

        function updateMoreInfoIconColor() {
            var color = $('.modal-title').find('span:first').css('color');
            $('.slussen-more-info').css('color', color);
        }

function handleCTAClick(event, buttonLink, wholeCTAClickable) {
        // Check if the target is an anchor tag
        if (event.target.tagName === 'A') {
            return;
        }

        // Check if the target is inside .audio-player or .video-player
        if ($(event.target).closest('.audio-player').length === 0 && $(event.target).closest('.video-player').length === 0) {
            // Proceed with the redirection if the click is not on audio/video player
            if ((wholeCTAClickable == 'true' || wholeCTAClickable == true) && buttonLink != null) {
                event.preventDefault(); // Prevent default behavior
                event.stopPropagation(); // Stop event propagation
                window.location.href = buttonLink;
            }
        }
    }

$(document).ready(function() {
            var uniqueId = "#fd5b8ad2-21c5-47e2-90fc-0fab0ad7a32d";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
            var linkColor = '#222222'; // This also uses Razor syntax to inject a color value

            $(uniqueId + ' .cta-description a').each(function() {
                $(this).css('color', linkColor); // This sets the color of the links
            });
        });

$(document).ready(function () {

        function setMinWidthForWrapper() {
            $("#65e71763-4e68-4d21-842c-cb882da03777" + ' .sliding-image-wrapper > div').each(function () {
                var totalWidth = 0;
                $(this).find('.sliding-image').each(function () {
                    totalWidth += $(this).outerWidth(true); // true includes margin
                });
                $(this).css('min-width', totalWidth + 'px'); // Set the min-width of the wrapper
                $(this).parent().css('min-width', (totalWidth * 2) + 'px'); // Set the min-width of the wrapper
            });
        }

        // Call the function on document ready
        setMinWidthForWrapper();

        // Call the function on window resize
        $(window).resize(function () {
            setMinWidthForWrapper();
        });

        const $imageWrappers = $('.sliding-image-wrapper > div');

        $("#65e71763-4e68-4d21-842c-cb882da03777").click(function () {
            $($imageWrappers).toggleClass("animation-paused");
            $(this).find('.bi-pause-circle').toggleClass("d-none");
            $(this).find('.bi-play-circle').toggleClass("d-none");
        });

    });

function handleCTAClick(event, buttonLink, wholeCTAClickable) {
        // Check if the target is an anchor tag
        if (event.target.tagName === 'A') {
            return;
        }

        // Check if the target is inside .audio-player or .video-player
        if ($(event.target).closest('.audio-player').length === 0 && $(event.target).closest('.video-player').length === 0) {
            // Proceed with the redirection if the click is not on audio/video player
            if ((wholeCTAClickable == 'true' || wholeCTAClickable == true) && buttonLink != null) {
                event.preventDefault(); // Prevent default behavior
                event.stopPropagation(); // Stop event propagation
                window.location.href = buttonLink;
            }
        }
    }

$(document).ready(function() {
            var uniqueId = "#d737109d-5a65-4cf4-b665-f9b71268ab86";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
            var linkColor = '#222222'; // This also uses Razor syntax to inject a color value

            $(uniqueId + ' .cta-description a').each(function() {
                $(this).css('color', linkColor); // This sets the color of the links
            });
        });

function handleCTAClick(event, buttonLink, wholeCTAClickable) {
        // Check if the target is an anchor tag
        if (event.target.tagName === 'A') {
            return;
        }

        // Check if the target is inside .audio-player or .video-player
        if ($(event.target).closest('.audio-player').length === 0 && $(event.target).closest('.video-player').length === 0) {
            // Proceed with the redirection if the click is not on audio/video player
            if ((wholeCTAClickable == 'true' || wholeCTAClickable == true) && buttonLink != null) {
                event.preventDefault(); // Prevent default behavior
                event.stopPropagation(); // Stop event propagation
                window.location.href = buttonLink;
            }
        }
    }

$(document).ready(function() {
            var uniqueId = "#d8fac3b4-9a09-4ac9-bf46-79e577f04774";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
            var linkColor = 'WHITE'; // This also uses Razor syntax to inject a color value

            $(uniqueId + ' .cta-description a').each(function() {
                $(this).css('color', linkColor); // This sets the color of the links
            });
        });

function handleCTAClick(event, buttonLink, wholeCTAClickable) {
        // Check if the target is an anchor tag
        if (event.target.tagName === 'A') {
            return;
        }

        // Check if the target is inside .audio-player or .video-player
        if ($(event.target).closest('.audio-player').length === 0 && $(event.target).closest('.video-player').length === 0) {
            // Proceed with the redirection if the click is not on audio/video player
            if ((wholeCTAClickable == 'true' || wholeCTAClickable == true) && buttonLink != null) {
                event.preventDefault(); // Prevent default behavior
                event.stopPropagation(); // Stop event propagation
                window.location.href = buttonLink;
            }
        }
    }

$(document).ready(function() {
            var uniqueId = "#3860a1c9-ac03-46d9-9fd1-2e6e8dc1986b";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
            var linkColor = '#222222'; // This also uses Razor syntax to inject a color value

            $(uniqueId + ' .cta-description a').each(function() {
                $(this).css('color', linkColor); // This sets the color of the links
            });
        });

function handleCTAClick(event, buttonLink, wholeCTAClickable) {
        // Check if the target is an anchor tag
        if (event.target.tagName === 'A') {
            return;
        }

        // Check if the target is inside .audio-player or .video-player
        if ($(event.target).closest('.audio-player').length === 0 && $(event.target).closest('.video-player').length === 0) {
            // Proceed with the redirection if the click is not on audio/video player
            if ((wholeCTAClickable == 'true' || wholeCTAClickable == true) && buttonLink != null) {
                event.preventDefault(); // Prevent default behavior
                event.stopPropagation(); // Stop event propagation
                window.location.href = buttonLink;
            }
        }
    }

$(document).ready(function() {
            var uniqueId = "#86451308-13f0-494c-883b-81d880534e64";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
            var linkColor = 'WHITE'; // This also uses Razor syntax to inject a color value

            $(uniqueId + ' .cta-description a').each(function() {
                $(this).css('color', linkColor); // This sets the color of the links
            });
        });

$(document).ready(function () {
        $('.talk-with-us .btn').click(function (event) {
            event.stopPropagation();
            openTalkWithUs(event);
            showOverlay();
        });

        $('.talk-with-us-information-close').click(function (event) {
            event.stopPropagation();
            closeTalkWithUs(event, true);
        });
    });

    function openTalkWithUs(event) {
        executeAllModalsAndMenuCloseFunctions(event);
        $('.talk-with-us-information').removeClass('d-none');
        $('.talk-with-us').addClass('d-none');
    }

    function closeTalkWithUs(event, forceClose) {
        if (event != null && !forceClose && $(event.target).closest('.talk-with-us-information').length) {
            return;
        }

        $('.talk-with-us-information').addClass('d-none');
        $('.talk-with-us').removeClass('d-none');
        $(".overlay").addClass("d-none");
    }

    $(document).ready(function () {
        $('a[href="funktion:slussen"]').each(function () {
            $(this).removeAttr('href');
            $(this).attr('onclick', 'openSlussen();');
        });
    });

    window.modalsAndMenuCloseFunctions.push(closeTalkWithUs);

    $(document).ready(function () {
        try {
            if (checkIfIframeDesign()) {
                $('.talk-with-us').addClass('d-none');
            }
        }
        catch (err) {
        }
    });

    function darkenColor(rgbColor, percent) {
        var parts = rgbColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

        if (!parts) return rgbColor; // if parsing failed, return original color

        var r = parseInt(parts[1]);
        var g = parseInt(parts[2]);
        var b = parseInt(parts[3]);

        r = parseInt(r * (1 - percent / 100));
        g = parseInt(g * (1 - percent / 100));
        b = parseInt(b * (1 - percent / 100));

        return "rgb(" + r + "," + g + "," + b + ")";
    }

    function toggleBackgroundColor(element, darken) {
        var originalColor = $(element).data('originalColor') || $(element).css('backgroundColor');
        if (!$(element).data('originalColor')) {
            $(element).data('originalColor', originalColor);
        }
        var color = darken ? darkenColor(originalColor, 20) : originalColor;
        $(element).css('backgroundColor', color);
    }

    $(document).ready(function () {
        var isTouch = false;

        $('.custom-hover-darken').on('touchstart', function () {
            isTouch = true;
            toggleBackgroundColor(this, true);
        });

        $('.custom-hover-darken').on('touchend touchcancel', function () {
            toggleBackgroundColor(this, false);
            setTimeout(function () { isTouch = false; }, 500); // Reset after a delay
        });

        $('.custom-hover-darken').hover(function () {
            if (!isTouch) { toggleBackgroundColor(this, true); }
        }, function () {
            if (!isTouch) { toggleBackgroundColor(this, false); }
        });
    });

$(document).ready(function () {
        isIframeDesign = checkIfIframeDesign();
        if (isIframeDesign === true) {
            $('footer').addClass('d-none');
        }
    });

function notifyParentOfUrlChange() {
            window.parent.postMessage(document.location.href, '*');
        }

        $(document).ready(function () {
            $('.cookieconsent-optin-preferences').each(function () {
                var $matchingDiv = $(this).prev('.cookieconsent-optout-preferences');
                if (!$matchingDiv.length) {
                    $matchingDiv = $(this).parent().find('.cookieconsent-optout-preferences').first();
                }

                if (!$matchingDiv.length) {
                    $matchingDiv = $('<div style="width: 100%; color:inherit; position: absolute; z-index: 10;" class="cookieconsent-optout-preferences">För att se på videon behöver du <a href="javascript:Cookiebot.renew()">acceptera youtube-kakor</a></div>');
                    $(this).before($matchingDiv);
                }

                if (!$(this).attr('data-cookieconsent')) {
                    var src = $(this).attr('src');
                    $(this).attr('data-cookieblock-src', src)
                        .attr('data-cookieconsent', 'preferences')
                        .removeAttr('src');
                }
            });
        });

        try {
            if (checkIfIframeDesign()) {
                if ($('#iframeBackButton').length > 0) {

                    if (sessionStorage.getItem('startingUrl') == null) {
                        sessionStorage.setItem('startingUrl', document.location.href)
                    }

                    if (sessionStorage.getItem('startingUrl') == document.location.href) {
                        sessionStorage.setItem('showBackButton', 'false');
                    }
                    else {
                        sessionStorage.setItem('showBackButton', 'true');
                    }

                    if (sessionStorage.getItem('showBackButton') === 'true' && sessionStorage.getItem('startingUrl') != document.location.href) {
                        $('#iframeBackButton').removeClass('d-none');
                    }
                    else {
                        $('#iframeBackButton').addClass('d-none');
                    }

                    $('#iframeBackButton').click(function () {
                        window.parent.postMessage('iframeBack', '*');
                    });
                }

                // Listen for URL changes
                window.addEventListener('popstate', notifyParentOfUrlChange);
                window.addEventListener('hashchange', notifyParentOfUrlChange);

                //LIsten for location/url change
                window.addEventListener('load', function (event) { 
                    notifyParentOfUrlChange();
                });

                // Initial URL
                window.addEventListener('load', notifyParentOfUrlChange);

                window.addEventListener('message', function (event) {
                    if (event.data === 'iframeBack') {
                        window.history.back();
                    }
                });
            }
        }
        catch (err) {
        }