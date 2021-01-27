chrome.runtime.onInstalled.addListener(function () {

    let badge_list: string[] = ['스트리머','매니저','VIP','인증 완료','Broadcaster','Moderator','Verified'];
    let badge_setting: string[] = ['streamer','manager','vip','verified'];//just for popup page switch setting.
    chrome.storage.local.set({ badge_list: badge_list, badge_setting: badge_setting}, function(){
    });

    /*chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: { hostEquals: 'www.twitch.tv', schemes: ['https'] },
                    })
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
            }
        ]);
    });*/
});

/*const twitch_url = 'https://twitch.tv/*';
const filter = {urls:[twitch_url]}
let handleUpdated = function(tabId, changeInfo, tabInfo){

}
browser.tabs.onUpdated.addListener(handleUpdated, filter);*/

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    
    let url = tab?.url;

    if(!url){
        return null;
    }
    if (changeInfo.status === 'complete' && url.match(/https\:\/\/www\.twitch\.tv/)) {
        chrome.pageAction.show(tabId);
    }
    
});
chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        let id : number | undefined = tabs[0].id;
        if(id){
            chrome.tabs.sendMessage(id, {action: "onHistoryStateUpdated"}, function(response) {
                
            }); 
        }
    });
});