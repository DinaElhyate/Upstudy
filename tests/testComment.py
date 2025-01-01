import time
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

class TestPostDetailPage(unittest.TestCase):
    def setUp(self):
        # Initialisation du driver
        self.driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))
        self.driver.get("http://localhost:3000/login")  # Accéder à la page de login

    def tearDown(self):
        self.driver.quit()

    def test_login_and_post_details(self):
        """Vérifier que les données sur la page de détails du post sont affichées correctement après connexion."""
        
        # Localiser les champs de saisie pour la connexion
        username_input = self.driver.find_element(By.ID, "username")
        password_input = self.driver.find_element(By.ID, "password")
        login_button = self.driver.find_element(By.CSS_SELECTOR, ".form-btn button")
        
        # Fournir les informations de connexion
        username_input.send_keys("dina")
        password_input.send_keys("dina")
        
        # Soumettre le formulaire de connexion
        login_button.click()

        # Attendre la redirection après connexion
        WebDriverWait(self.driver, 10).until(
            EC.url_contains("/h")  # Vérifier qu'on est bien redirigé après la connexion
        )

        # Accéder à la page du post spécifique (post ID = 3)
        self.driver.get("http://localhost:3000/post/3")

        # Attendre que la page du post soit entièrement chargée
        WebDriverWait(self.driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, ".single"))
        )

        # Vérifier que le titre du post est affiché
        title = self.driver.find_element(By.CSS_SELECTOR, ".single h3")
        self.assertTrue(title.is_displayed(), "Le titre du post n'est pas affiché.")
        
        # Vérifier que la description du post est affichée
        description = self.driver.find_element(By.CSS_SELECTOR, ".single p")
        self.assertTrue(description.is_displayed(), "La description du post n'est pas affichée.")

        # Vérifier l'image du post
        post_image = self.driver.find_element(By.CSS_SELECTOR, ".single img")
        self.assertTrue(post_image.is_displayed(), "L'image du post n'est pas affichée.")

        # Vérifier que le nom de l'auteur est affiché
        author_name = self.driver.find_element(By.CSS_SELECTOR, ".single .user span")
        self.assertTrue(author_name.is_displayed(), "Le nom de l'auteur n'est pas affiché.")

        # Vérifier que le temps écoulé depuis la publication du post est affiché
        post_time = self.driver.find_element(By.CSS_SELECTOR, ".single .user p")
        self.assertTrue(post_time.is_displayed(), "Le temps écoulé depuis la publication du post n'est pas affiché.")

        # Vérifier que l'option de modification et suppression est disponible si l'utilisateur est l'auteur
        edit_button = self.driver.find_elements(By.CSS_SELECTOR, ".single .edit")
        self.assertGreater(len(edit_button), 0, "Les options de modification et de suppression ne sont pas disponibles pour l'auteur.")
  
if __name__ == "__main__":
    unittest.main()
