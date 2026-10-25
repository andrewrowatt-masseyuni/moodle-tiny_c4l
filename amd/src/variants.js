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
 * Tiny C4L components variants.
 *
 * @module      tiny_c4l/variants
 * @copyright   2023 Marc Català <reskit@gmail.com>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

const variants = [
    {
        id: 0,
        name: "align-center",
        html: "",
    },
    {
        id: 1,
        name: "align-left",
        html: "",
    },
    {
        id: 2,
        name: "align-right",
        html: "",
    },
    {
        id: 3,
        name: "caption",
        html:
            `<figcaption><em class="c4l-figure-footer">Consectetur adipiscing elit.</em>
            <span class="c4l-figure-caption" aria-label="{{#caption}}">
            <strong>Source: </strong>Phasellus a posuere nibh.</span></figcaption>`,
    },
    {
        id: 4,
        name: "comfort-reading",
        html: "",
    },
    {
        id: 5,
        name: "dont-card-only",
        html: "",
    },
    {
        id: 6,
        name: "full-width",
        html: "",
    },
    {
        id: 7,
        name: "ordered-list",
        html: "",
    },
    {
        id: 8,
        name: "quote",
        html:
            `<div class="c4l-embedded-caption" aria-label="{{#caption}}"><span>Marcus Tullius Cicero,</span>
             De Finibus Bonorum et Malorum</div>`,
    },
    // Massey variants. Their ids start at 100 so upstream can add variants without clashing with
    // ids saved in user preferences. Variants in a group switch each other off.

    // Table captions. Both add the same caption, which must come straight after <table>; the
    // below variant's class moves it under the table.
    {
        id: 100,
        name: "caption-above",
        group: "table-caption",
        html: `<caption>Table 1: Consectetur adipiscing elit.</caption>`,
    },
    {
        id: 101,
        name: "caption-below",
        group: "table-caption",
        html: `<caption>Table 1: Consectetur adipiscing elit.</caption>`,
    },

    // Colours. Blue is the default: a component with no colour class is blue, so blue is shown as
    // chosen whenever no other colour is, and choosing it just switches the others off.
    {
        id: 102,
        name: "mu-color-blue",
        group: "mu-color",
        isDefault: true,
        html: "",
    },
    {
        id: 103,
        name: "mu-color-green",
        group: "mu-color",
        html: "",
    },
    {
        id: 104,
        name: "mu-color-grey",
        group: "mu-color",
        html: "",
    },
    {
        id: 105,
        name: "mu-color-teal",
        group: "mu-color",
        html: "",
    },
    {
        id: 106,
        name: "mu-color-violet",
        group: "mu-color",
        html: "",
    },
    {
        id: 107,
        name: "mu-color-yellow",
        group: "mu-color",
        html: "",
    },

    // Accordion stacks: more copies of the chosen accordion below it. {{COPY}} is expanded by ui.js
    // to a copy of the component, so the copies match its style. Without one, a single accordion.
    {
        id: 108,
        name: "mu-stack-2",
        group: "mu-stack",
        html: "{{COPY}}",
    },
    {
        id: 109,
        name: "mu-stack-3",
        group: "mu-stack",
        html: "{{COPY}}{{COPY}}",
    },
    {
        id: 110,
        name: "mu-stack-4",
        group: "mu-stack",
        html: "{{COPY}}{{COPY}}{{COPY}}",
    },
];

export default {
        variants,
};
