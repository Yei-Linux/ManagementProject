export const emailTemplate = () => {
    let template = "<div style=\"background: black;display: flex;justify-content: flex-end;\">\n" +
    "        <h4 style=\"color: white;\">Yei Linux</h4>\n" +
    "    </div>\n" +
    "    <section>\n" +
    "        <p>Hey!, {{userOwner}} is inviting to join its project {{projectName}} in Task {{task}}.</p><strong>Click to accept invitation</strong>\n" +
    "        <button><a href='{{linkEncrypted}}'>Accept</a></button>\n" +
    "    </section>\n" +
    "  </body>";

    return template;
};


