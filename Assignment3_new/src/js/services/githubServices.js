const rootUrl = "https://api.github.com/";
let githubServices = function () {
    
    this.createRepo = function (repoName, private, description) {
        let header = new Headers({
            "Content-Type": "application/json",
            "Authorization": `token ${sessionStorage.getItem("token")}`,
            "User-Agent": `${repoName}`
        });

        let data = {
            name: `${repoName}`,
            description: `${description}`,
            homepage: "https://github.com",
            private: false
        };

        let result = postRepoData(`${rootUrl}user/repos`, header, data);
    }

    function postRepoData(url, header, data) {
        fetch(url, {
            method: "POST",
            headers: header,
            body: JSON.stringify(data)
        }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resp) {                    
                    $("#createRepo").modal("hide");
                    $("#dashBoard").addClass("row mx-0").bs_info(`Repository Name- ${resp.name}`, "Repository Created");
                });
            }
        }).catch(function (error) {
            console.log("Request failure: ", error);
        });
    }

    this.createIssue = function (title, comment, issueRepoName) {
        let header = new Headers({
            "Content-Type": "application/json",
            "Authorization": `token ${sessionStorage.getItem("token")}`,
            "User-Agent": `${title}`
        });

        let data = {
            title: `${title}`,
            body: `${comment}`
        };

        let result = postIssueData(`${rootUrl}repos/${sessionStorage.getItem("userName")}/${issueRepoName}/issues`,
            header, data);
    }

    function postIssueData(url, header, data) {
        fetch(url, {
            method: "POST",
            headers: header,
            body: JSON.stringify(data)
        }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resp) {                  
                    $("#createIssue").modal("hide");
                    $("#dashBoard").addClass("row mx-0").bs_info(`Issue Name- ${resp.title}`, "Issue Created");
                });
            }
        }).catch(function (error) {
            console.log("Request failure: ", error);
        });
    }

    this.addCollab = function (collabUserName, collabRepoName, permission) {
        let header = new Headers({
            "Content-Type": "application/json",
            "Authorization": `token ${sessionStorage.getItem("token")}`,
            "User-Agent": `${title}`
        });
        let result = putCollabData(`${rootUrl}repos/${sessionStorage.getItem("userName")}/${collabRepoName}/collaborators/${collabUserName}?permission=${permission}`,
            header);
    }

    function putCollabData(url, header) {
        fetch(url, {
            method: "PUT",
            headers: header
        }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resp) {                    
                    $("#addCollab").modal("hide");
                    $("#msg").text("Collaborator access invite has been sent.");
                    $("#success-alert").fadeTo(2000, 500).slideUp(500, function () {
                        $("#success-alert").slideUp(500);
                    });
                });
            }
        }).catch(function (error) {
            console.log("Request failure: ", error);
        });
    }

    this.getRepositories = function () {
        let header = new Headers({
            "Content-Type": "application/json",
            "Authorization": `token ${sessionStorage.getItem("token")}`,
        });
        let url = `${rootUrl}users/${sessionStorage.getItem("userName")}/repos`;
        fetch(url, {
            method: "GET",
            headers: header
        }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resp) {
                    let repoNames = resp.filter(a => a.open_issues != 0);
                    let repoSelect = document.getElementById("selectRepo");
                    repoNames.forEach((item) => {
                        var o = document.createElement("option");
                        o.text = item.name;
                        o.value = item.name;
                        repoSelect.appendChild(o);
                    });
                    $("#updateIssue").modal();
                });
            }
        }).catch(function (error) {
            console.log("Request failure: ", error);
        });
    }

    this.getIssues = function (repoName) {
        let header = new Headers({
            "Content-Type": "application/json",
            "Authorization": `token ${sessionStorage.getItem("token")}`,
        });
        let url = `${rootUrl}repos/${sessionStorage.getItem("userName")}/${repoName}/issues`;
        fetch(url, {
            method: "GET",
            headers: header
        }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resp) {
                    let repoSelect = document.getElementById("selectIssue");
                    resp.forEach((item) => {
                        let o = document.createElement("option");
                        o.text = item.title;
                        o.value = item.number;

                        let attrBody = document.createAttribute("body");
                        attrBody.value = item.body;
                        o.setAttributeNode(attrBody);

                        let attrCommentCount = document.createAttribute("commentcount");
                        attrCommentCount.value = item.comments;
                        o.setAttributeNode(attrCommentCount);

                        let attrState = document.createAttribute("state");
                        attrState.value = item.state;
                        o.setAttributeNode(attrState);

                        repoSelect.appendChild(o);

                    });
                });
            }
        }).catch(function (error) {
            console.log("Request failure: ", error);
        });
    }

    this.getLastComment = function (repoName, commentId) {
        let header = new Headers({
            "Content-Type": "application/json",
            "Authorization": `token ${sessionStorage.getItem("token")}`,
        });
        let url = `${rootUrl}repos/${sessionStorage.getItem("userName")}/${repoName}/issues/comments`;
        fetch(url, {
            method: "GET",
            headers: header
        }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resp) {
                    let objComment = resp[resp.length - 1];
                    let lastCommentText = `${objComment.body} &#10; &#10;Last Updated:${objComment.updated_at}`;
                    $("#lastCommentText").html(lastCommentText);
                });
            }
        }).catch(function (error) {
            console.log("Request failure: ", error);
        });
    }

    this.updateIssue = function (repoName, issueId, issueBody, issueTitle, state) {
        let header = new Headers({
            "Content-Type": "application/json",
            "Authorization": `token ${sessionStorage.getItem("token")}`
        });
        let data = {
            title: `${issueTitle}`,
            body: `${issueBody}`,
            state: `${state}`
        };

        let result = patchIssue(`${rootUrl}repos/${sessionStorage.getItem("userName")}/${repoName}/issues/${issueId}`,
            header, data);
    }

    function patchIssue(url, header, data) {
        fetch(url, {
            method: "PATCH",
            headers: header,
            body: JSON.stringify(data)
        }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resp) {                 
                    $("#updateIssue").modal("hide");
                    $("#msg").text("Issue has been updated.");
                    $("#success-alert").fadeTo(2000, 500).slideUp(500, function () {
                        $("#success-alert").slideUp(500);
                    });
                });
            }
        }).catch(function (error) {
            console.log("Request failure: ", error);
        });
    }

    this.addComment = function (repoName, issueId, comments) {
        let header = new Headers({
            "Content-Type": "application/json",
            "Authorization": `token ${sessionStorage.getItem("token")}`
        });
        let data = {
            body: `${comments}`
        };
        let result = postComment(`${rootUrl}repos/${sessionStorage.getItem("userName")}/${repoName}/issues/${issueId}/comments`,
            header, data);
    }

    function postComment(url, header, data) {
        fetch(url, {
            method: "POST",
            headers: header,
            body: JSON.stringify(data)
        }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resp) {
                    $("#updateIssue input").val("");                   
                    $("#updateIssue").modal("hide");
                    $("#msg").text("Comment has been added.");
                    $("#success-alert").fadeTo(2000, 500).slideUp(500, function () {
                        $("#success-alert").slideUp(500);
                    });
                });
            }
        }).catch(function (error) {
            console.log("Request failure: ", error);
        });
    }
}