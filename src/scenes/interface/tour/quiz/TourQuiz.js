/* START OF COMPILED CODE */

import BaseContainer from "../../../base/BaseContainer";
import Interactive from "../../../components/Interactive";
import TourQuizButton from "./TourQuizButton";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class TourQuiz extends BaseContainer {

    constructor(scene, x, y) {
        super(scene, x ?? 0, y ?? 0);

        // block
        const block = scene.add.rectangle(0, 0, 1520, 960);
        block.setOrigin(0, 0);
        block.isFilled = true;
        block.fillColor = 0;
        block.fillAlpha = 0.2;
        this.add(block);

        // bg
        const bg = scene.add.ninePatchContainer(760, 484, 708, 664, "prompt", "window");
        bg.marginLeft = 50;
        bg.marginTop = 50;
        bg.marginRight = 50;
        bg.marginBottom = 50;
        this.add(bg);

        // question
        const question = scene.add.container(760, 214);
        question.visible = false;
        this.add(question);

        // option4
        const option4 = new TourQuizButton(scene, 0, 497);
        question.add(option4);

        // option3
        const option3 = new TourQuizButton(scene, 0, 387);
        question.add(option3);

        // option2
        const option2 = new TourQuizButton(scene, 0, 277);
        question.add(option2);

        // option1
        const option1 = new TourQuizButton(scene, 0, 167);
        question.add(option1);

        // questionText
        const questionText = scene.add.text(0, 79, "", {});
        questionText.setOrigin(0.5, 0.5);
        questionText.text = "Text";
        questionText.setStyle({ "align": "center", "color": "#000", "fixedWidth":590,"fontFamily": "Arial Narrow", "fontSize": "32px" });
        questionText.setWordWrapWidth(590, true);
        question.add(questionText);

        // questionTitle
        const questionTitle = scene.add.text(0, 0, "", {});
        questionTitle.setOrigin(0.5, 0.5);
        questionTitle.text = "Text";
        questionTitle.setStyle({ "align": "center", "fixedWidth":600,"fontFamily": "CCFaceFront", "fontSize": "40px", "fontStyle": "bold italic", "stroke": "#003366", "strokeThickness":9,"shadow.color": "#003366", "shadow.blur":3,"shadow.stroke":true});
        question.add(questionTitle);

        // start
        const start = scene.add.container(760, 234);
        this.add(start);

        // startButton
        const startButton = new TourQuizButton(scene, 0, 401);
        start.add(startButton);

        // startText
        const startText = scene.add.text(0, 196, "", {});
        startText.setOrigin(0.5, 0.5);
        startText.text = "Text";
        startText.setStyle({ "align": "center", "color": "#000", "fixedWidth":600,"fontFamily": "Arial Narrow", "fontSize": "32px" });
        startText.setWordWrapWidth(600);
        start.add(startText);

        // startTitle
        const startTitle = scene.add.text(0, 0, "", {});
        startTitle.setOrigin(0.5, 0.5);
        startTitle.text = "Text";
        startTitle.setStyle({ "align": "center", "fixedWidth":600,"fontFamily": "CCFaceFront", "fontSize": "40px", "fontStyle": "bold italic", "stroke": "#003366", "strokeThickness":9,"shadow.color": "#003366", "shadow.blur":3,"shadow.stroke":true});
        start.add(startTitle);

        // block (components)
        new Interactive(block);

        /* START-USER-CTR-CODE */

        startTitle.setText(this.getString('tour_start_title'))

        startText.setText(
            this.getFormatString('tour_start_text',
            this.getString('game'))
        )

        startButton.setText(this.getString('tour_start_button'))

        /* END-USER-CTR-CODE */
    }

    /* START-USER-CODE */
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */
