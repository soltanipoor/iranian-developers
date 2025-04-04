$.getJSON("developers.json", function (json) {
    let not_github_count = 0;
    $.map(json, function (item) {
        // console.log(item.github_username);

        let avatar = "https://avatars2.githubusercontent.com/u/16510392?v=4";
        if (!item.github_username) {
            avatar = "https://avatars2.githubusercontent.com/u/16510392?v=4";
            not_github_count++;
            item.github_username = "NOT_" + not_github_count;
        }
        else {
            fetch('https://api.github.com/users/' + item.github_username)
                .then(res => { return res.json() })
                .then(json => {
                    avatar = json.avatar_url;
                    document.getElementById('AV' + item.github_username).src = avatar;
                })
                .catch(err => console.log(err));
        }

        if (!item.resume_url) {
            item.resume_url = "#";
        }

        if (!item.personal_url) {
            item.personal_url = "#";
        }

        let lastSkill = '';

        if (item.skills.length > 1) {
            lastSkill = ' و <span class="text-info">' + item.skills.pop() + '</span>';
        }

        $('\
        <div class="col-sm-6 col-md-4 col-xl-3">\
        <img id="AV'+ item.github_username + '" class="card-img-top" src="' + avatar + '"\
            alt="Card image cap">\
        <div class="card mb-4 shadow-sm">\
            <div class="card-body">\
                <h3 class="mb-3">' + item.name + '</h3>\
                 <p class="card-text">\
                    در ' + item.work_at + ' کار می کند، در \
                    <span class="text-info">' + item.skills.join('</span> ،<span class="text-info">') + '</span>\
                    ' + lastSkill + ' مهارت دارد.\
                </p>\
                <div class="d-flex justify-content-between align-items-center">\
                    <div class="btn-group">\
                        <a href="'+ item.resume_url + '"class="btn btn-sm btn-outline-secondary">رزومه</a>\
                            <a href="'+ item.personal_url + '" class="btn btn-sm btn-outline-secondary">سایت شخصی</a>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>').appendTo("#box");
    });
});