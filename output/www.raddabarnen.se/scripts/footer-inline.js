window.dataLayer = window.dataLayer || [];
		window.dataLayer.push({
			"event" : "pageData",
			"pageType" : "StartPage"
		});

window.AppInsightsConnectionString = "InstrumentationKey=540e9274-e6f8-4a52-a81f-54c33c11d405;IngestionEndpoint=https://westeurope-5.in.applicationinsights.azure.com/;LiveEndpoint=https://westeurope.livediagnostics.monitor.azure.com/;ApplicationId=93c2d4df-042f-4b21-b1af-bbaae446074f";

(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-58QKZB7');

[
	{
	"@context": "http://schema.org",
	"@type": "WebSite",
	"name": "Rädda Barnen",
	"url": "https://www.raddabarnen.se",
	"description": "Rädda Barnen kämpar för barns rättigheter i Sverige och i världen.",
	"potentialAction": {
	"@type": "SearchAction",
	"target": "https://www.raddabarnen.se/sok/?q={query}",
	"query-input": "required name=query"
	}
	},
	{
	"@context": "http://schema.org",
	"@type": "Organization",
	"url": "https://www.raddabarnen.se",
	"logo": "https://www.raddabarnen.se/Content/images/radda-barnen-logo.png",
	"foundingDate": "1919",
	"address": {
	"@type": "PostalAddress",
	"streetAddress": "Gustavslundsvägen 141",
	"postalCode": "107 88",
	"addressLocality": "Bromma",
	"addressCountry": "Sweden"
	},
	"contactPoint": [
	{
	"@type": "ContactPoint",
	"telephone": "+46-8-698-90-00",
	"contactType": "customer service",
	"email": "kundservice@rb.se",
	"areaServed": [ "SE" ]
	}
	],
	"sameAs": [
	"https://www.facebook.com/raddabarnen",
	"https://www.youtube.com/user/raddabarnen",
	"https://twitter.com/raddabarnen",
	"https://instagram.com/raddabarnen",
	"https://www.linkedin.com/company/save-the-children-sweden"
	]
	}
	]

!function(T,l,y){var S=T.location,k="script",D="instrumentationKey",C="ingestionendpoint",I="disableExceptionTracking",E="ai.device.",b="toLowerCase",w="crossOrigin",N="POST",e="appInsightsSDK",t=y.name||"appInsights";(y.name||T[e])&&(T[e]=t);var n=T[t]||function(d){var g=!1,f=!1,m={initialize:!0,queue:[],sv:"5",version:2,config:d};function v(e,t){var n={},a="Browser";return n[E+"id"]=a[b](),n[E+"type"]=a,n["ai.operation.name"]=S&&S.pathname||"_unknown_",n["ai.internal.sdkVersion"]="javascript:snippet_"+(m.sv||m.version),{time:function(){var e=new Date;function t(e){var t=""+e;return 1===t.length&&(t="0"+t),t}return e.getUTCFullYear()+"-"+t(1+e.getUTCMonth())+"-"+t(e.getUTCDate())+"T"+t(e.getUTCHours())+":"+t(e.getUTCMinutes())+":"+t(e.getUTCSeconds())+"."+((e.getUTCMilliseconds()/1e3).toFixed(3)+"").slice(2,5)+"Z"}(),iKey:e,name:"Microsoft.ApplicationInsights."+e.replace(/-/g,"")+"."+t,sampleRate:100,tags:n,data:{baseData:{ver:2}}}}var h=d.url||y.src;if(h){function a(e){var t,n,a,i,r,o,s,c,u,p,l;g=!0,m.queue=[],f||(f=!0,t=h,s=function(){var e={},t=d.connectionString;if(t)for(var n=t.split(";"),a=0;a<n.length;a++){var i=n[a].split("=");2===i.length&&(e[i[0][b]()]=i[1])}if(!e[C]){var r=e.endpointsuffix,o=r?e.location:null;e[C]="https://"+(o?o+".":"")+"dc."+(r||"services.visualstudio.com")}return e}(),c=s[D]||d[D]||"",u=s[C],p=u?u+"/v2/track":d.endpointUrl,(l=[]).push((n="SDK LOAD Failure: Failed to load Application Insights SDK script (See stack for details)",a=t,i=p,(o=(r=v(c,"Exception")).data).baseType="ExceptionData",o.baseData.exceptions=[{typeName:"SDKLoadFailed",message:n.replace(/\./g,"-"),hasFullStack:!1,stack:n+"\nSnippet failed to load ["+a+"] -- Telemetry is disabled\nHelp Link: https://go.microsoft.com/fwlink/?linkid=2128109\nHost: "+(S&&S.pathname||"_unknown_")+"\nEndpoint: "+i,parsedStack:[]}],r)),l.push(function(e,t,n,a){var i=v(c,"Message"),r=i.data;r.baseType="MessageData";var o=r.baseData;return o.message='AI (Internal): 99 message:"'+("SDK LOAD Failure: Failed to load Application Insights SDK script (See stack for details) ("+n+")").replace(/\"/g,"")+'"',o.properties={endpoint:a},i}(0,0,t,p)),function(e,t){if(JSON){var n=T.fetch;if(n&&!y.useXhr)n(t,{method:N,body:JSON.stringify(e),mode:"cors"});else if(XMLHttpRequest){var a=new XMLHttpRequest;a.open(N,t),a.setRequestHeader("Content-type","application/json"),a.send(JSON.stringify(e))}}}(l,p))}function i(e,t){f||setTimeout(function(){!t&&m.core||a()},500)}var e=function(){var n=l.createElement(k);n.src=h;var e=y[w];return!e&&""!==e||"undefined"==n[w]||(n[w]=e),n.onload=i,n.onerror=a,n.onreadystatechange=function(e,t){"loaded"!==n.readyState&&"complete"!==n.readyState||i(0,t)},n}();y.ld<0?l.getElementsByTagName("head")[0].appendChild(e):setTimeout(function(){l.getElementsByTagName(k)[0].parentNode.appendChild(e)},y.ld||0)}try{m.cookie=l.cookie}catch(p){}function t(e){for(;e.length;)!function(t){m[t]=function(){var e=arguments;g||m.queue.push(function(){m[t].apply(m,e)})}}(e.pop())}var n="track",r="TrackPage",o="TrackEvent";t([n+"Event",n+"PageView",n+"Exception",n+"Trace",n+"DependencyData",n+"Metric",n+"PageViewPerformance","start"+r,"stop"+r,"start"+o,"stop"+o,"addTelemetryInitializer","setAuthenticatedUserContext","clearAuthenticatedUserContext","flush"]),m.SeverityLevel={Verbose:0,Information:1,Warning:2,Error:3,Critical:4};var s=(d.extensionConfig||{}).ApplicationInsightsAnalytics||{};if(!0!==d[I]&&!0!==s[I]){var c="onerror";t(["_"+c]);var u=T[c];T[c]=function(e,t,n,a,i){var r=u&&u(e,t,n,a,i);return!0!==r&&m["_"+c]({message:e,url:t,lineNumber:n,columnNumber:a,error:i}),r},d.autoExceptionInstrumented=!0}return m}(y.cfg);function a(){y.onInit&&y.onInit(n)}(T[t]=n).queue&&0===n.queue.length?(n.queue.push(a),n.trackPageView({})):a()}(window,document,{src: "https://js.monitor.azure.com/scripts/b/ai.2.gbl.min.js", crossOrigin: "anonymous", cfg: { instrumentationKey:'c02f5d4c-7a53-4389-b7ad-4acf83b4b1d1', disableCookiesUsage: false }});

var RaddaBarnen = RaddaBarnen || {};
	var root = document.getElementById("root");

var config = {
        formProduct: "HeroGiftForm",
        data: {"resourceUrl":"https://www.raddabarnen.se/Static/lang/Views_SV.xml","pageId":14,"formProduct":"HeroGiftForm","isDefault":true,"formData":{"formType":[{"selector":"MonthlyGiftForm","frequencyTitle":"Ge varje månad","isDefault":true,"customValueIcon":"/globalassets/bilder/ikoner/ikon_hjarta.png","customValueDescription":"Med din gåva kan vi göra världen lite bättre för barn varje dag!","minAmount":50,"products":[{"description":"Varje månad kan dina 100 kr ge åtta barn på flykt varsin filt som värmer i vinterkylan.","icon":"/globalassets/bilder/ikoner/gavoformular_ikoner_filt.jpg","value":100,"suffix":"kr","default":false},{"description":"Varje månad kan dina 200 kr behandla två akut undernärda barn med energirik nötkräm.","icon":"/globalassets/bilder/ikoner/gavoformular_ikoner_notkram.jpg","value":200,"suffix":"kr","default":true},{"description":"Varje månad kan dina 500 kr ge 20 barn en trygg plats att leka på.","icon":"/globalassets/bilder/ikoner/gavoformular_ikoner_trygg-plats.jpg","value":500,"suffix":"kr","default":false}],"defaultValue":200},{"selector":"OneTimeGiftForm","frequencyTitle":"Ge en gång","isDefault":false,"customValueIcon":"/globalassets/bilder/ikoner/ikon_hjarta.png","customValueDescription":"Med din gåva kan vi göra världen lite bättre för barn varje dag!","minAmount":50,"products":[{"description":"Dina 250 kr kan ge fyra barn på flykt varsin jacka som värmer i vinterkylan.","icon":"/globalassets/bilder/ikoner/gavoformular_ikoner_jacka.jpg","value":250,"suffix":"kr","default":false},{"description":"Dina 350 kr kan ge tre barn behandling för lunginflammation, malaria eller diarré.","icon":"/globalassets/bilder/ikoner/ikon_halsa.png","value":350,"suffix":"kr","default":true},{"description":"Dina 500 kr kan ge 20 barn en trygg plats att leka på i en månad.","icon":"/globalassets/bilder/ikoner/gavoformular_ikoner_trygg-plats.jpg","value":500,"suffix":"kr","default":false}],"defaultValue":350}],"formUrl":"/stod-oss/ge-en-gava/"}}
    };

RaddaBarnen.PaymentForm(root, config);

document.addEventListener('DOMContentLoaded',function(){if(typeof FindApi === 'function'){var api = new FindApi();api.setApplicationUrl('/');api.setServiceApiBaseUrl('/find_v2/');api.processEventFromCurrentUri();api.bindWindowEvents();api.bindAClickEvent();api.sendBufferedEvents();}})

function showCookieBanner(){var n=document.getElementById("cookiebanner"),t=parseInt(n.offsetHeight);n.style.bottom=cookieBannerSliderPos-t+"px";cookieBannerSliderPos+=4;cookieBannerSliderPos<t?setTimeout(function(){showCookieBanner()},1):(cookieBannerSliderPos=0,n.style.bottom="0px")}function hideCookieBanner(){var n=document.getElementById("cookiebanner");n.style.display="none"}function showCustomizeModal(){var n=document.getElementById("cookiebanner-custom"),t=document.getElementById("cookiebanner-main");n.classList.toggle("hide");t.classList.toggle("hide")}function submitCustomizedConsent(){Cookiebot.submitCustomConsent(Cookiebot.consent.preferences,Cookiebot.consent.statistics,Cookiebot.consent.marketing);hideCookieBanner()}function initCheckbox(){var n=document.getElementById("preferences-checkbox"),t=document.getElementById("statistics-checkbox"),i=document.getElementById("marketing-checkbox");n.checked=Cookiebot.consent.preferences;t.checked=Cookiebot.consent.statistics;i.checked=Cookiebot.consent.marketing}function handleConsent(n,t){t==="preferences"?Cookiebot.consent.preferences=n.checked:t==="statistics"?Cookiebot.consent.statistics=n.checked:t==="marketing"&&(Cookiebot.consent.marketing=n.checked)}function saveUserLocation(){var n=window.location.pathname;sessionStorage.setItem("path_name",JSON.stringify(n))}var cookieBannerSliderPos=0,openInfoButtons=document.querySelectorAll(".c-m-open-button");[].forEach.call(openInfoButtons,function(n){n.addEventListener("click",function(){n.parentNode.parentNode.parentNode.classList.toggle("c-m-option-open")})});initCheckbox()

if(-1==document.location.href.search("appspot.com")&&-1==document.referrer.search("appspot.com")){var _etmc=[];_etmc.push(["setOrgId","100012771"]);_etmc.push(["trackPageView"])};

fbq("track","ViewContent");