import Axios from 'axios';
import { validateAll } from 'indicative';

import config from '../config';

export default class ArticlesService {
  async getArticles(url = `${config.apiUrl}/photos`) {
    const response = await Axios.get(url);

    return response.data;
  }

  async getArticle (slug) {
    const categories = JSON.parse(localStorage.getItem('categories'))

    if(categories !== 'undefined') {
      return categories
    }

    const response = await Axios.get(`${config.apiUrl}/posts/${slug}`)

    localStorage.setItem('categories', JSON.stringify(response.data))

    return response.data
  }
  async getArticleCategories() {
    const response = await Axios.get(`${config.apiUrl}/comments`);

    return response.data;
  }

  createArticle = async (data, token) => {
    if (!data.image) {
      return Promise.reject([{
        message: 'The image is required.',
      }]);
    }

    try {
      const rules = {
        title: 'required',
        content: 'required',
        category: 'required',
      };

      const messages = {
        required: 'The {{ field }} is required.',
      };

      await validateAll(data, rules, messages);

      const image = await this.uploadToCloudinary(data.image);
      const response = await Axios.post(`${config.apiUrl}/articles`, {
        title: data.title,
        content: data.content,
        category_id: data.category,
        imageUrl: image.secure_url,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      return response.data;
    } catch (errors) {
      if (errors.response) {
        return Promise.reject(errors.response.data);
      }

      return Promise.reject(errors);
    }
  }

  async uploadToCloudinary(image) {
    const form = new FormData();
    form.append('file', image);
    form.append('upload_preset', 'my_uploads');

    const response = await Axios.post('https://api.cloudinary.com/v1_1/dutxunrno/image/upload', form);

    return response.data;
  }
}
