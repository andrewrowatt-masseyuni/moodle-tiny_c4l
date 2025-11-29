
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Tiny C4L components.
 *
 * @module      tiny_c4l/components
 * @copyright   2022 Marc Català <reskit@gmail.com>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/* eslint-disable max-len */

const components = [
    {
        id: "0",
        name: "keyconcept",
        type: "contextual",
        imageClass: "c4l-keyconcept-icon",
        code:
            '<p class="c4l-spacer"></p><div class="c4lv-keyconcept {{VARIANTS}}" aria-label="{{#keyconcept}}">' +
            "{{PLACEHOLDER}}</div>",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempor odio vel turpis consequat sodales.",
        variants: ["full-width"],
    },
    {
        id: "1",
        name: "tip",
        type: "contextual",
        imageClass: "c4l-tip-icon",
        code:
            `<p class="c4l-spacer"></p><div class="c4lv-tip {{VARIANTS}}" aria-label="{{#tip}}">
            {{PLACEHOLDER}}</div>`,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempor odio vel turpis consequat sodales.",
        variants: ["full-width"],
    },
    {
        id: "2",
        name: "reminder",
        type: "contextual",
        imageClass: "c4l-reminder-icon",
        code:
            `<p class="c4l-spacer"></p><div class="c4lv-reminder {{VARIANTS}}"
             aria-label="{{#reminder}}">
            {{PLACEHOLDER}}</div>`,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempor odio vel turpis consequat sodales.",
        variants: ["full-width"],
    },
    {
        id: "3",
        name: "quote",
        type: "contextual",
        imageClass: "c4l-quote-icon",
        code:
            `<p class="c4l-spacer"></p><div class="c4lv-quote {{VARIANTS}}"
            aria-label="{{#quote}}">
            <div class="c4l-quote-body"><div class="c4l-quote-line"></div><div class="c4l-quote-text">
            <p>{{PLACEHOLDER}}</p>
            </div></div>
            {{VARIANTSHTML}}
            </div>`,
        text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a posuere nibh, eu mollis lacus." +
            " Praesent dictum in velit sed dapibus.",
        variants: ["full-width", "quote"],
    },
    {
        id: "4",
        name: "dodontcards",
        type: "contextual",
        imageClass: "c4l-dodontcards-icon",
        code:
            `<p class="c4l-spacer"></p><div class="c4lv-dodontcards {{VARIANTS}}"
            aria-label="{{#dodontcards}}">
            <div class="c4l-dodontcards-do" aria-label="{{#do-card}}">{{PLACEHOLDER}}</div>
            <div class="c4l-dodontcards-dont" aria-label="{{#dont-card}}">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Phasellus a posuere nibh, eu mollis lacus.
            Praesent dictum in velit sed dapibus. Orci varius natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus.</div></div>`,
        text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a posuere nibh, eu mollis lacus." +
            " Praesent dictum in velit sed dapibus." +
            "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        variants: ["full-width"],
    },
    {
        id: "5",
        name: "readingcontext",
        type: "contextual",
        imageClass: "c4l-readingcontext-icon",
        code:
            `<p class="c4l-spacer"></p><div class="c4lv-readingcontext {{VARIANTS}}"
            aria-label="{{#readingcontext}}">
            <p>{{PLACEHOLDER}}</p>{{VARIANTSHTML}}</div>`,
        text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus leo, hendrerit ac sem vitae," +
            " posuere egestas nisi. Lorem ipsum dolor sit amet. " +
            "Phasellus leo, hendrerit ac sem vitae, posuere egestas nisi.",
        variants: ["full-width", "quote", "comfort-reading"],
    },
    {
        id: "6",
        name: "example",
        type: "contextual",
        imageClass: "c4l-example-icon",
        code:
            `<p class="c4l-spacer"></p><div class="c4lv-example {{VARIANTS}}"
            aria-label="{{#example}}"><h1>Lorem ipsum dolor sit amet</h1>
             <p>{{PLACEHOLDER}}</p></div>`,
        text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
            " Phasellus a posuere nibh, eu mollis lacus." +
            " Praesent dictum in velit sed dapibus. Orci varius natoque penatibus et magnis dis parturient montes," +
            " nascetur ridiculus mus.",
        variants: ["full-width"],
    },
    {
        id: "7",
        name: "figure",
        type: "contextual",
        imageClass: "c4l-figure-icon",
        code:
            `<p class="c4l-spacer"></p><figure class="c4lv-figure {{VARIANTS}}"
            aria-label="{{#figure}}"><img src="" alt="Lorem ipsum dolor sit amet">
            {{VARIANTSHTML}}</figure>`,
        text: "Consectetur adipiscing elit.",
        variants: ["full-width", "caption"],
    },
    {
        id: "8",
        name: "tag",
        type: "contextual",
        imageClass: "c4l-tag-icon",
        code:
            `<p class="c4l-spacer"></p><div class="c4l-display-left" aria-label="{{#tag}}">
            <div class="c4lv-tag {{VARIANTS}}">{{PLACEHOLDER}}</div></div>`,
        text: "Lorem ipsum",
        variants: ["align-right"],
    },
    {
        id: "9",
        name: "inlinetag",
        type: "contextual",
        imageClass: "c4l-inlinetag-icon",
        code: `<span class="c4lv-inlinetag {{VARIANTS}}" aria-label="{{#inlinetag}}">{{PLACEHOLDER}}</span>`,
        text: "Text",
        variants: [],
    },
    {
        id: "10",
        name: "attention",
        type: "procedural",
        imageClass: "c4l-attention-icon",
        code:
            `<p class="c4l-spacer"></p><div class="c4lv-attention {{VARIANTS}}" aria-label="{{#attention}}">
            {{PLACEHOLDER}}</div>`,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempor odio vel turpis consequat sodales.",
        variants: ["full-width"],
    },
    {
        id: "11",
        name: "estimatedtime",
        type: "procedural",
        imageClass: "c4l-estimatedtime-icon",
        code:
            `<p class="c4l-spacer"></p><div class="c4l-inline-group"><div class="c4lv-estimatedtime {{VARIANTS}}"
            aria-label="{{#estimatedtime}}">{{PLACEHOLDER}} <span>{{#min}}</span></div></div>`,
        text: "15",
        variants: ["align-left"],
    },
    {
        id: "12",
        name: "duedate",
        type: "procedural",
        imageClass: "c4l-duedate-icon",
        code:
            `<p class="c4l-spacer"></p><div class="c4l-inline-group"><div class="c4lv-duedate {{VARIANTS}}"
            aria-label="{{#duedate}}">{{PLACEHOLDER}}</div></div>`,
        text: "November 17th",
        variants: ["align-left"],
    },
    {
        id: "13",
        name: "proceduralcontext",
        type: "procedural",
        imageClass: "c4l-proceduralcontext-icon",
        code:
            `<p class="c4l-spacer"></p><p class="c4lv-proceduralcontext {{VARIANTS}}"
            aria-label="{{#proceduralcontext}}" >
            {{PLACEHOLDER}}</p>`,
        text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a posuere nibh, eu mollis lacus." +
            " Praesent dictum in velit sed dapibus." +
            " Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla quis lorem aliquet," +
            " fermentum dolor ac, venenatis turpis.",
        variants: ["full-width"],
    },
    {
        id: "14",
        name: "learningoutcomes",
        type: "procedural",
        imageClass: "c4l-learningoutcomes-icon",
        code:
            `<p class="c4l-spacer"></p>
            <div class="c4lv-learningoutcomes {{VARIANTS}}" aria-label="{{#learningoutcomes}}">
            <h6 class="c4l-learningoutcomes-title">{{#learningoutcomes}}</h6>
            <ul class="c4l-learningoutcomes-list"><li>{{PLACEHOLDER}}</li><li>Curabitur non nulla sit amet
            nisl tempus convallis quis ac lectus. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.</li>
            <li> Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit.
             Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.</li></ul></div>`,
        text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porta, neque id feugiat consectetur, " +
            "enim ipsum tincidunt nunc, id suscipit mauris urna sit amet lectus.",
        variants: ["full-width", "ordered-list"],
    },
    {
        id: "15",
        name: "gradingvalue",
        type: "evaluative",
        imageClass: "c4l-gradingvalue-icon",
        code:
            `<p class="c4l-spacer"></p><div class="c4l-inline-group"><div class="c4lv-gradingvalue {{VARIANTS}}"
             aria-label="{{#gradingvalue}}"><span>{{#gradingvalue}}: </span>{{PLACEHOLDER}}</div></div>`,
        text: "33.3%",
        variants: ["align-left"],
    },
    {
        id: "16",
        name: "expectedfeedback",
        type: "evaluative",
        imageClass: "c4l-expectedfeedback-icon",
        code:
            `<p class="c4l-spacer"></p><div class="c4lv-expectedfeedback {{VARIANTS}}"
            aria-label="{{#expectedfeedback}}">
            <p>{{PLACEHOLDER}}</p></div>`,
        text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a posuere nibh, eu mollis lacus." +
            " Praesent dictum in velit sed dapibus.",
        variants: ["full-width"],
    },
    {
        id: "17",
        name: "allpurposecard",
        type: "helper",
        imageClass: "c4l-allpurposecard-icon",
        code:
            `<p class="c4l-spacer"></p><div class="c4lv-allpurposecard {{VARIANTS}}"
            aria-label="{{#allpurposecard}}"><p>{{PLACEHOLDER}}</p></div>`,
        text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a posuere nibh, eu mollis lacus." +
            " Praesent dictum in velit sed dapibus." +
            " Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        variants: ["full-width"],
    },
    {
        id: "18",
        name: "mu-table",
        type: "mu-tables",
        imageClass: "c4l-mu-table-icon c4l-mu-no-variants",
        code:
            `<p class="c4l-spacer"></p><div class="mu-c4l mu-table"
            aria-label="{{#allpurposecard}}"><table>
            <thead><tr><td>{{PLACEHOLDER}}</td><td>Heading</td><td>Heading</td></tr></thead>
            <tbody><tr><td>content</td><td>content</td><td>content</td></tr></tbody></table></div>`,
        text:
            "Heading 1",
        variants: [],
    },
    {
        id: "19",
        name: "mu-table-grey-variant",
        type: "mu-tables",
        imageClass: "c4l-mu-table-icon c4l-mu-no-variants",
        code:
            `<p class="c4l-spacer"></p><div class="mu-c4l mu-table mu-table-grey-variant"
            aria-label="{{#allpurposecard}}"><table>
            <thead><tr><td>{{PLACEHOLDER}}</td><td>Heading</td><td>Heading</td></tr></thead>
            <tbody><tr><td>content</td><td>content</td><td>content</td></tr></tbody></table></div>`,
        text:
            "Heading 1",
        variants: [],
    },

    {
        id: "20",
        name: "mu-aiasl1",
        type: "mu-aiassessmentscale",
        imageClass: "c4l-mu-aiassessmentscale-icon aiasl1 c4l-mu-no-variants",
        code:
            `<div class="mu-fc mu-fc-aias1 mu-fc-aias-l1">
            <div class="mu-fc-inner">
            <p></p>
            <h5>No AI</h5>
            <p>You must not use AI at any point during the assessment. You must demonstrate your core skills and knowledge.</p>
            <p class="findoutmorelink"><a href="https://stream.massey.ac.nz/course/view.php?id=10" target="_blank"
            >Find out more about AI at Massey</a></p>
            <p></p>
            </div>
            </div>`,
        text:
            "",
        variants: [],
    },

    {
        id: "21",
        name: "mu-aiasl2",
        type: "mu-aiassessmentscale",
        imageClass: "c4l-mu-aiassessmentscale-icon aiasl2 c4l-mu-no-variants",
        code:
            `<div class="mu-fc mu-fc-aias1 mu-fc-aias-l2">
            <div class="mu-fc-inner">
            <h5>AI Planning</h5>
            <p>You may use AI for planning, idea development and research. Your final submission should show how you have developed and refined these ideas.</p>
            <p></p>
            <details><summary>See what this means for this assessment</summary>
            <p></p>
            <p>Depending on the requirements of your assessment, you may use AI to:</p>
            <ul>
            <li>generate ideas for the <a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1339419" target="_blank" title="Opens in a new tab">content</a>&nbsp;and&nbsp;<a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1339421" target="_blank" title="Opens in a new tab">structure</a> of a piece of work<a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1339419" target="_blank" title="Opens in a new tab"></a></li>
            <li><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1339425" target="_blank" title="Opens in a new tab">organise your thoughts</a> when creating a draft<a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1339425" target="_blank" title="Opens in a new tab"></a><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1339421" target="_blank"></a></li>
            <li><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1340248" target="_blank" title="Opens in a new tab">look for</a> and <a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1340249" target="_blank">summarise</a> relevant literature</li>
            <li><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1340398" target="_blank" title="Opens in a new tab">conduct market research</a></li>
            <li><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1340399" target="_blank" title="Opens in a new tab">conduct exploratory data analysis</a></li>
            <li><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1340413" target="_blank" title="Opens in a new tab">suggest counterarguments</a></li>
            <li><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1339435" target="_blank" title="Opens in a new tab">provoke reflection</a></li>
            <li><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1339422" target="_blank" title="Opens in a new tab">understand the marking rubric</a></li>
            </ul>
            <p></p>
            </details>
            <p></p>
            <p>The prompts and outputs of any AI used must be provided in an appendix to your submitted assessment. See these <a href="https://stream.massey.ac.nz/mod/book/view.php?id=5430644&amp;chapterid=1354035" target="_blank">guidelines for writing your appendix</a>.</p>
            <p><a href="https://stream.massey.ac.nz/mod/resource/view.php?id=5469872" target="_blank">Download this Word document</a> to guide you in creating your AI use statement.</p>
            <p class="findoutmorelink"><a href="https://stream.massey.ac.nz/course/view.php?id=10" target="_blank">Find out more about AI at Massey</a></p>
            <p></p>
            </div>
            </div>
            <p>&nbsp;</p>`,
        text:
            "",
        variants: [],
    },

    {
        id: "22",
        name: "mu-aiasl3",
        type: "mu-aiassessmentscale",
        imageClass: "c4l-mu-aiassessmentscale-icon aiasl3 c4l-mu-no-variants",
        code:
            `<div class="mu-fc mu-fc-aias1 mu-fc-aias-l3">
            <div class="mu-fc-inner">
            <h5>AI Collaboration</h5>
            <p>You may use AI to assist with specific tasks, such as drafting text, refining and evaluating your work.</p>
            <p></p>
            <p></p>
            <details><summary>See what this means for this assessment</summary>
            <p></p>
            <p>Depending on the requirements of your assessment, you may use AI to:</p>
            <ul>
            <li>generate ideas for the&nbsp;<a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1339419" target="_blank" title="Opens in a new tab">content</a>&nbsp;and&nbsp;<a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1339421" target="_blank" title="Opens in a new tab">structure</a>&nbsp;of a piece of work</li>
            <li><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1339425" target="_blank" title="Opens in a new tab">organise your thoughts</a>&nbsp;when creating a draft</li>
            <li><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1340248" target="_blank" title="Opens in a new tab">look for</a>&nbsp;and&nbsp;<a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1340249" target="_blank" title="Opens in a new tab">summarise</a>&nbsp;relevant literature</li>
            <li><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1340398" target="_blank" title="Opens in a new tab">conduct market research</a></li>
            <li><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1340398" target="_blank" title="Opens in a new tab"></a><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1340399" target="_blank" title="Opens in a new tab">conduct exploratory data analysis</a></li>
            <li><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1340399" target="_blank" title="Opens in a new tab"></a><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1340413" target="_blank" title="Opens in a new tab">suggest counterarguments</a></li>
            <li><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1340413" target="_blank" title="Opens in a new tab"></a><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1339435" target="_blank" title="Opens in a new tab">provoke reflection</a></li>
            <li><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1339435" target="_blank" title="Opens in a new tab"></a><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1339422" target="_blank" title="Opens in a new tab">understand the marking rubric</a></li>
            <li><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1340611" target="_blank" title="Opens in a new tab">generate images</a><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1340611" target="_blank"><br></a></li>
            <li><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1340956" target="_blank" title="Opens in a new tab">draft presentations</a></li>
            <li><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1341223" target="_blank" title="Opens in a new tab">improve your writing</a>&nbsp;and <a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1341245" target="_blank">proofread your work</a></li>
            <li><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1341248" target="_blank" title="Opens in a new tab">ask for feedback on your work</a></li>
            </ul>
            <p></p>
            <p></p>
            </details>
            <p></p>
            <p>You must critically evaluate and modify any AI generated content you use, and the prompts and outputs of any AI used must be provided in an appendix to your submitted assessment. See these&nbsp;<a href="https://stream.massey.ac.nz/mod/book/view.php?id=5430644&amp;chapterid=1354035" target="_blank">guidelines for writing your appendix</a>.</p>
            <p><a href="https://stream.massey.ac.nz/mod/resource/view.php?id=5469872" target="_blank">Download this Word document</a> to guide you in creating your AI use statement.</p>
            <p class="findoutmorelink"><a href="https://stream.massey.ac.nz/course/view.php?id=10" target="_blank">Find out more about AI at Massey</a></p>
            <p></p>
            </div>
            </div>
            <p>&nbsp;</p>`,
        text:
            "",
        variants: [],
    },

    {
        id: "23",
        name: "mu-aiasl5",
        type: "mu-aiassessmentscale",
        imageClass: "c4l-mu-aiassessmentscale-icon aiasl5 c4l-mu-no-variants",
        code:
            `<div class="mu-fc mu-fc-aias1 mu-fc-aias-l5">
            <div class="mu-fc-inner">
            <p></p>
            <h5>AI Exploration</h5>
            <p>You should use AI creatively to solve the task, potentially co-designing new approaches with your instructor.</p>
            <details><summary>See what this means for this assessment</summary>
            <p></p>
            <p>Depending on the requirements of your assessment, you may use AI to:</p>
            <ul>
            <li>generate ideas for the&nbsp;<a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1339419" target="_blank" title="Opens in a new tab">content</a>&nbsp;and&nbsp;<a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1339421" target="_blank" title="Opens in a new tab">structure</a>&nbsp;of a piece of work</li>
            <li><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1339425" target="_blank" title="Opens in a new tab">organise your thoughts</a>&nbsp;when creating a draft</li>
            <li><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1340248" target="_blank" title="Opens in a new tab">look for</a>&nbsp;and&nbsp;<a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1340249" target="_blank" title="Opens in a new tab">summarise</a>&nbsp;relevant literature</li>
            <li><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1340398" target="_blank" title="Opens in a new tab">conduct market research</a></li>
            <li><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1340399" target="_blank" title="Opens in a new tab">conduct exploratory data analysis</a></li>
            <li><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1340413" target="_blank" title="Opens in a new tab">suggest counterarguments</a></li>
            <li><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1339435" target="_blank" title="Opens in a new tab">provoke reflection</a></li>
            <li><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1339422" target="_blank" title="Opens in a new tab">understand the marking rubric</a></li>
            <li><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1340611" target="_blank" title="Opens in a new tab">generate images</a><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1340611" target="_blank" title="Opens in a new tab"><br></a></li>
            <li><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1340956" target="_blank" title="Opens in a new tab">draft presentations</a></li>
            <li><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1341223" target="_blank" title="Opens in a new tab">improve your writing</a>&nbsp;and <a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1341245" target="_blank" title="Opens in a new tab">proofread your work</a></li>
            <li><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5385617&amp;chapterid=1341248" target="_blank" title="Opens in a new tab">ask for feedback on your work</a></li>
            <li><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5353915&amp;chapterid=1335656" target="_blank" title="Opens in a new tab">apply concepts to current events</a></li>
            <li><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5353915&amp;chapterid=1335655" target="_blank" title="Opens in a new tab">assist with creative problem solving</a></li>
            <li><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5353915&amp;chapterid=1335672" target="_blank" title="Opens in a new tab">connect abstract concepts to concrete scenarios</a></li>
            <li><a href="https://stream.massey.ac.nz/mod/book/view.php?id=5353915&amp;chapterid=1335726" target="_blank" title="Opens in a new tab">train with simulated scenarios</a></li>
            </ul>
            </details>
            <p><a href="https://stream.massey.ac.nz/mod/resource/view.php?id=5469872" target="_blank">Download this Word document</a> to guide you in creating your AI use statement.</p>
            <p class="findoutmorelink"><a href="https://stream.massey.ac.nz/course/view.php?id=10" target="_blank">Find out more about AI at Massey</a></p>
            <p></p>
            </div>
            </div>
            <p>&nbsp;</p>`,
        text:
            "",
        variants: [],
    },

{id: "30", name: "mu-watch", type: "mu-activities", imageClass: "c4l-mu-watch-icon", code: `<p class="c4l-spacer"></p><div class="c4l-mu-activities c4l-mu-watch {{VARIANTS}}" aria-label="{{#mu-watch}}" ><p>{{PLACEHOLDER}}</p></div>`, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", variants: ["mu-blue", "mu-green", "mu-grey"],},
{id: "32", name: "mu-read", type: "mu-activities", imageClass: "c4l-mu-read-icon", code: `<p class="c4l-spacer"></p><div class="c4l-mu-activities c4l-mu-read {{VARIANTS}}" aria-label="{{#mu-read}}" ><p>{{PLACEHOLDER}}</p></div>`, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", variants: ["mu-blue", "mu-green", "mu-grey"],},
{id: "34", name: "mu-write", type: "mu-activities", imageClass: "c4l-mu-write-icon", code: `<p class="c4l-spacer"></p><div class="c4l-mu-activities c4l-mu-write {{VARIANTS}}" aria-label="{{#mu-write}}" ><p>{{PLACEHOLDER}}</p></div>`, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", variants: ["mu-blue", "mu-green", "mu-grey"],},
{id: "36", name: "mu-explore", type: "mu-activities", imageClass: "c4l-mu-explore-icon", code: `<p class="c4l-spacer"></p><div class="c4l-mu-activities c4l-mu-explore {{VARIANTS}}" aria-label="{{#mu-explore}}" ><p>{{PLACEHOLDER}}</p></div>`, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", variants: ["mu-blue", "mu-green", "mu-grey"],},
{id: "38", name: "mu-listen", type: "mu-activities", imageClass: "c4l-mu-listen-icon", code: `<p class="c4l-spacer"></p><div class="c4l-mu-activities c4l-mu-listen {{VARIANTS}}" aria-label="{{#mu-listen}}" ><p>{{PLACEHOLDER}}</p></div>`, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", variants: ["mu-blue", "mu-green", "mu-grey"],},
{id: "40", name: "mu-group", type: "mu-activities", imageClass: "c4l-mu-group-icon", code: `<p class="c4l-spacer"></p><div class="c4l-mu-activities c4l-mu-group {{VARIANTS}}" aria-label="{{#mu-group}}" ><p>{{PLACEHOLDER}}</p></div>`, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", variants: ["mu-blue", "mu-green", "mu-grey"],},
{id: "42", name: "mu-comment", type: "mu-activities", imageClass: "c4l-mu-comment-icon", code: `<p class="c4l-spacer"></p><div class="c4l-mu-activities c4l-mu-comment {{VARIANTS}}" aria-label="{{#mu-comment}}" ><p>{{PLACEHOLDER}}</p></div>`, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", variants: ["mu-blue", "mu-green", "mu-grey"],},
{id: "44", name: "mu-checkmark", type: "mu-activities", imageClass: "c4l-mu-checkmark-icon", code: `<p class="c4l-spacer"></p><div class="c4l-mu-activities c4l-mu-checkmark {{VARIANTS}}" aria-label="{{#mu-checkmark}}" ><p>{{PLACEHOLDER}}</p></div>`, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", variants: ["mu-blue", "mu-green", "mu-grey"],},
{id: "46", name: "mu-guidance", type: "mu-activities", imageClass: "c4l-mu-guidance-icon", code: `<p class="c4l-spacer"></p><div class="c4l-mu-activities c4l-mu-guidance {{VARIANTS}}" aria-label="{{#mu-guidance}}" ><p>{{PLACEHOLDER}}</p></div>`, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", variants: ["mu-blue", "mu-green", "mu-grey"],},
{id: "48", name: "mu-process", type: "mu-activities", imageClass: "c4l-mu-process-icon", code: `<p class="c4l-spacer"></p><div class="c4l-mu-activities c4l-mu-process {{VARIANTS}}" aria-label="{{#mu-process}}" ><p>{{PLACEHOLDER}}</p></div>`, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", variants: ["mu-blue", "mu-green", "mu-grey"],},
{id: "50", name: "mu-map", type: "mu-activities", imageClass: "c4l-mu-map-icon", code: `<p class="c4l-spacer"></p><div class="c4l-mu-activities c4l-mu-map {{VARIANTS}}" aria-label="{{#mu-map}}" ><p>{{PLACEHOLDER}}</p></div>`, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", variants: ["mu-blue", "mu-green", "mu-grey"],},
{id: "52", name: "mu-questionmark", type: "mu-activities", imageClass: "c4l-mu-questionmark-icon", code: `<p class="c4l-spacer"></p><div class="c4l-mu-activities c4l-mu-questionmark {{VARIANTS}}" aria-label="{{#mu-questionmark}}" ><p>{{PLACEHOLDER}}</p></div>`, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", variants: ["mu-blue", "mu-green", "mu-grey"],},
{id: "54", name: "mu-important", type: "mu-activities", imageClass: "c4l-mu-important-icon", code: `<p class="c4l-spacer"></p><div class="c4l-mu-activities c4l-mu-important {{VARIANTS}}" aria-label="{{#mu-important}}" ><p>{{PLACEHOLDER}}</p></div>`, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", variants: ["mu-blue", "mu-green", "mu-grey"],},
{id: "56", name: "mu-information", type: "mu-activities", imageClass: "c4l-mu-information-icon", code: `<p class="c4l-spacer"></p><div class="c4l-mu-activities c4l-mu-information {{VARIANTS}}" aria-label="{{#mu-information}}" ><p>{{PLACEHOLDER}}</p></div>`, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", variants: ["mu-blue", "mu-green", "mu-grey"],},
];

export default {
    components,
};
