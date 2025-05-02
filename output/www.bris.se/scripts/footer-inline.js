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
        var carousel = new bootstrap.Carousel('#carousel_da70c4f773a544448afc7c2490693e01', {
            touch: true,
            pause: false,
            interval: 30000,
        });

        window.carousels = window.carousels || {};
        window.carousels['carousel_da70c4f773a544448afc7c2490693e01'] = carousel;
    });

    $(document).ready(function() {

        $('#carousel_da70c4f773a544448afc7c2490693e01').on('slid.bs.carousel', function (e) {
        var activeIndex = $(e.relatedTarget).index();

        $('#carousel_da70c4f773a544448afc7c2490693e01' + ' .bris-carousel-indicators a').removeClass('active')
            .eq(activeIndex).addClass('active');
        });

        $('#carousel_da70c4f773a544448afc7c2490693e01' + ' .bris-carousel-indicators a').on('click', function () {
            // Remove active class from all indicators
            $('#carousel_da70c4f773a544448afc7c2490693e01' + ' .bris-carousel-indicators a').removeClass('active');
            // Add active class to the clicked indicator
            $(this).addClass('active');
        });
    });

$(document).ready(function () {
            $('#carousel_da70c4f773a544448afc7c2490693e01' + ' .carousel-play-toggle').click(function () {
                if ($('#pauseIcon').is(':visible')) {
                    $('#pauseIcon').addClass('d-none');
                    $('#playIcon').removeClass('d-none');
                    window.carousels['carousel_da70c4f773a544448afc7c2490693e01'].pause();
                } else {
                    $('#carousel_da70c4f773a544448afc7c2490693e01').carousel('cycle');
                    $('#pauseIcon').removeClass('d-none');
                    $('#playIcon').addClass('d-none');
                    window.carousels['carousel_da70c4f773a544448afc7c2490693e01']._config['interval'] = 30000;

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
            $("#ab60a7af-aecd-428d-9295-2487b420d0f8" + ' .sliding-image-wrapper > div').each(function () {
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

        $("#ab60a7af-aecd-428d-9295-2487b420d0f8").click(function () {
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
            var uniqueId = "#a07f93b0-fb3a-4147-8a8f-cbf635c0b667";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
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
            var uniqueId = "#45df221d-fe7d-4e2f-bed7-f6a2c8328056";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
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
            var uniqueId = "#af35a49e-905b-480f-9731-79d9de725795";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
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
            var uniqueId = "#49e9d863-e9a1-426e-a720-3dd380aecc89";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
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
            var uniqueId = "#e4e9790e-55ed-4ed2-bef5-5063bf75a516";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
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
            var uniqueId = "#1afc5399-365d-4135-abe5-4236d380f1a4";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
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
            var uniqueId = "#804016bb-d86b-40bc-8915-1f193b0c662c";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
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
            var uniqueId = "#76994cd7-7c04-4cc3-adbe-a65bc744ddb3";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
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
            var uniqueId = "#5e482c9b-dc1e-4de6-ad86-9e6ff9e0d1a7";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
            var linkColor = '#FFFFFF'; // This also uses Razor syntax to inject a color value

            $(uniqueId + ' .cta-description a').each(function() {
                $(this).css('color', linkColor); // This sets the color of the links
            });
        });

$(document).ready(function () {

        var paginator = new SideScrollPaginator("#block_49db4cec3ac74f8da0ee4ec27c0dc6bb");
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
            $("#90a97ebe-0a00-43c6-943d-efde9bcba1e4" + ' .sliding-image-wrapper > div').each(function () {
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

        $("#90a97ebe-0a00-43c6-943d-efde9bcba1e4").click(function () {
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
            var uniqueId = "#48c4720b-b9ba-495f-8b3b-17bbb5268a1e";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
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
            var uniqueId = "#09f067c7-bff6-4873-bd60-92a0c7e6dbea";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
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
            var uniqueId = "#f5409432-73d9-4563-98ce-5695f35986b9";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
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
            var uniqueId = "#5c104910-c59c-48c9-97ae-802c3e812db3";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
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
            var uniqueId = "#785fb8fa-6de4-4078-83a5-aff776cb491b";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
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
            var uniqueId = "#a5d84654-1a7d-4a07-9de8-4de047188f1f";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
            var linkColor = '#FFFFFF'; // This also uses Razor syntax to inject a color value

            $(uniqueId + ' .cta-description a').each(function() {
                $(this).css('color', linkColor); // This sets the color of the links
            });
        });

$(document).ready(function () {

        var paginator = new SideScrollPaginator("#block_8d9835b8d7034be8a7e08d522e868f36");
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
            var uniqueId = "#98fb3661-0c11-4e06-abd3-f03991e862d7";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
            var linkColor = '#222222'; // This also uses Razor syntax to inject a color value

            $(uniqueId + ' .cta-description a').each(function() {
                $(this).css('color', linkColor); // This sets the color of the links
            });
        });

$(document).ready(function () {

        function setMinWidthForWrapper() {
            $("#7abc79d1-327b-49cd-8a4d-19ad0aaf5395" + ' .sliding-image-wrapper > div').each(function () {
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

        $("#7abc79d1-327b-49cd-8a4d-19ad0aaf5395").click(function () {
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
            var uniqueId = "#9f7b9a28-6aeb-4f43-8b73-4a9e3619a1b3";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
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
            var uniqueId = "#5b0524f0-08c4-48be-a131-3c89dd41c299";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
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
            var uniqueId = "#3dc0635b-8b27-4446-89aa-3f36423ed0bd";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
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
            var uniqueId = "#633b65a4-a82a-4d17-9560-3f56e06c88c6";  // This uses Razor syntax to inject a unique ID, make sure it's correctly set in your Razor code
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