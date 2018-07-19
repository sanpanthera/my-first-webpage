function recastServices(keyword) {

    let data = { "text": `${keyword}`, "language": "en" };

    let header = new Headers({
        "Authorization": "Token 4e761c83b15b7d321b4fb0ef4b0e0ed0",
        "Content-Type": "application/json"
    });

    fetch("https://api.recast.ai/v2/request", {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }).then(function (response) {
        response.json().then(function (resp) {
            let repoName = " "
            if (resp.results.entities.git_repo !== undefined) {
             repoName = resp.results.entities.git_repo[0].value;
            }
            showPopup(resp.results.intents[0].slug,
                resp.results.intents[0].confidence, repoName);
        });
    }).catch(function (error) {
        console.log("Request failure: ", error);
    });
}

function showPopup(slug, confidence, repoName) {
    let accuracy = Number(confidence) * 100;
    let commandName = (accuracy !== 0) ? slug : "invalid";
    let objGithubServices = new githubServices();

    switch (commandName) {
        case "createrepo": {
            if (repoName !== undefined || repoName !== "") {
                $("#repoName").val(repoName);
            }
            $("#createRepo").modal();
            break;
        }
        case "createissue":
            $("#createIssue").modal();
            break;

        case "addcollab": {
            $("#addCollab").modal();
            break;
        }

        case "updateissue": {
            objGithubServices.getRepositories();
            $("#btnEditIssue, #divIssueState, #divCommentText").removeClass("d-none");
            $("#divlastCommentText,#divAddCommentText,#btnAddComment").addClass("d-none");
            $("#updateIssueModal").text("Update Issue");
            break;
        }

        case "displaylastcomment": {
            objGithubServices.getRepositories();
            $("#divlastCommentText").removeClass("d-none");
            $("#btnEditIssue, #btnAddComment,#divIssueState, #divCommentText,#divAddCommentText").addClass("d-none");
            $("#updateIssueModal").text("Show last comment");
            break;
        }
        case "addissuecomment": {
            objGithubServices.getRepositories();
            $("#btnEditIssue, #divIssueState, #divCommentText,#divlastCommentText").addClass("d-none");
            $("#divAddCommentText, #btnAddComment").removeClass("d-none");
            $("#updateIssueModal").text("Add a new comment");
            break;
        }

        default:
            " ";
    }
}