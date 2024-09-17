import { Builder, By, Key, until } from 'selenium-webdriver';
import 'chromedriver';

export const searchBlos = async (req, res) => {
    console.log("🚀 ~ register ~ req:", req.body)

    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://www.google.com');

        await driver.findElement(By.name('q')).sendKeys(req.body.title, Key.ENTER);

        await driver.wait(until.elementLocated(By.css('h3')), 5000);

        let results = await driver.findElements(By.css('h3'));

        let data = [];
        
        for (let i = 0; i < Math.min(results.length, 5); i++) {
            let title = await results[i].getText();
            let linkElement = await results[i].findElement(By.xpath('..'));
            let link = await linkElement.getAttribute('href');
            
            let descriptionElement = await driver.findElement(By.className("VwiC3b"));
            let description = await descriptionElement.getText();

            data.push({ title, link, description });
        }

        res.status(200).json({
            status: "success",
            data: data,
            message: "Successfully retrieved resources"
        });

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to retrieve resources"
        });
    } finally {
        await driver.quit();
    }
}
