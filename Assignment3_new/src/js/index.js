$(function () {
    $("#success-alert").hide();
    $("#tokenModal").modal();

    $("#btnSave").on("click", () => {
        sessionStorage.setItem("token", $("#txtToken").val());
        sessionStorage.setItem("userName", $("#txtUserName").val());
        $("#tokenModal").modal("hide");
    });

    $("#btnCommand").on("click", () => {
        recastServices($("#txtCommand").val());
    });

    $("#btnCreateRepo").on("click", () => {
        let repoName = $("#repoName").val();
        let description = $("#description").val();
        let privateRepo = $("input[name='repository[public]']:checked").val();
        let objGithubServices = new githubServices();
        objGithubServices.createRepo(repoName, privateRepo, description);
    });

    $("#btnCreateIssue").on("click", () => {
        let title = $("#title").val();
        let comment = $("#comment").val();
        let issueRepoName = $("#issueRepoName").val();

        let objGithubServices = new githubServices();
        objGithubServices.createIssue(title, comment, issueRepoName);
    });

    $("#btnAddCollab").on("click", () => {
        let collabUserName = $("#collabUserName").val();
        let collabRepoName = $("#collabRepoName").val();
        let permission = $("input[name='permission']:checked").val();

        let objGithubServices = new githubServices();
        objGithubServices.addCollab(collabUserName, collabRepoName, permission);
    });

    $("#selectRepo").on("change", (e) => {
        $("#selectIssue").html("");
        addOptions($("#selectIssue"), "Select an issue");
        let objGithubServices = new githubServices();
        objGithubServices.getIssues($(this).find(":selected").val());

    });

    $("#selectIssue").on("change", function () {
        $selectedOption = $(this).find("option:selected");

        $("#commentText").val($selectedOption.attr("body"));
        if ($selectedOption.attr("state") != "open") {
            $("#issueState").prop("disabled", "disabled").prop("checked", true);
        }
        else {
            $("#issueState").prop("disabled", false).prop("checked", false);
        }

        if (!$("#divlastCommentText").hasClass("d-none")) {
            if (Number($selectedOption.attr("commentcount")) != 0) {
                let objGithubServices = new githubServices();
                objGithubServices.getLastComment($("#selectRepo").val(),
                    $selectedOption.attr("commentcount"));
            }
            else {
                $("#lastCommentText").val("No Comments available");
            }
        }
    });

    $("#btnEditIssue").on("click", () => {

        let repoName = $("#selectRepo option:selected").val();
        $selectedIssueOption = $("#selectIssue option:selected")
        let issueId = $selectedIssueOption.val();
        let issueBody = $selectedIssueOption.attr("body");
        let issueTitle = $selectedIssueOption.text();
        let state = "open";
        if ($("#issueState:checked")) { state = "closed"; }

        let objGithubServices = new githubServices();
        objGithubServices.updateIssue(repoName, issueId, issueBody, issueTitle, state);
    });

    $("#btnAddComment").on("click", () => {

        let repoName = $("#selectRepo option:selected").val();
        let issueId = $("#selectIssue option:selected").val();
        let comments = $("#addCommentText").val();

        let objGithubServices = new githubServices();
        objGithubServices.addComment(repoName, issueId, comments);
    });

    $(".modal").on("hidden.bs.modal", () => {

        $(this).find("input,select").val("");
        $(this).find("textarea").text("");
        $(this).find("[type='radio']").not("#repository_public_true").prop("checked", false);
        $(this).find("select option").not(":first").remove();
        $("#txtCommand").val("");
    });

    $("#txtCommand").on("keydown", function (e) {
        if (e.keyCode == '13')
            $("#btnCommand").click();
    });

    function addOptions(elem, text) {
        let o = document.createElement("option");
        o.text = text;
        o.value = text;
        elem[0].appendChild(o);
    }
});