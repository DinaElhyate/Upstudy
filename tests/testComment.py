import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

class TestPostComments(unittest.TestCase):
    def setUp(self):
        """Configurer le driver."""
        self.driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))
        self.driver.get("http://localhost:3000/post/3")  # Remplacez par un ID de post valide

    def tearDown(self):
        """Fermer le driver."""
        self.driver.quit()

    def test_comment_submission(self):
        """Vérifier que l'utilisateur peut soumettre un commentaire."""
        driver = self.driver

        # Attendre que la section des commentaires soit visible
        WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, ".comments-section"))
        )

        # Localiser le champ de saisie pour les commentaires
        comment_input = driver.find_element(By.CSS_SELECTOR, "textarea[name='comment']")
        submit_button = driver.find_element(By.CSS_SELECTOR, ".submit-comment-btn")

        # Entrer un commentaire et le soumettre
        test_comment = "Ceci est un commentaire de test."
        comment_input.send_keys(test_comment)
        submit_button.click()

        # Attendre que le commentaire apparaisse dans la liste
        WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, ".comment"))
        )

        # Vérifier que le commentaire est affiché
        comments = driver.find_elements(By.CSS_SELECTOR, ".comment .content")
        self.assertTrue(any(test_comment in comment.text for comment in comments),
                        "Le commentaire soumis n'est pas affiché.")

    def test_comment_display(self):
        """Vérifier que les commentaires sont affichés pour un post."""
        driver = self.driver

        # Attendre que la section des commentaires soit visible
        WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, ".comments-section"))
        )

        # Vérifier qu'il y a au moins un commentaire affiché
        comments = driver.find_elements(By.CSS_SELECTOR, ".comment")
        self.assertGreater(len(comments), 0, "Aucun commentaire n'est affiché pour ce post.")

if __name__ == "__main__":
    unittest.main()
