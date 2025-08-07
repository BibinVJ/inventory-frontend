import { describe, it, expect, vi, beforeEach } from 'vitest';
import { updateProfile, updateAddress, updateSocialLinks, updateProfileImage, deleteProfileImage } from '../../services/ProfileService';
import api from '../../services/api';
import { User, Address, SocialLink } from '../../types';

vi.mock('../../services/api');

const mockedApi = api as jest.Mocked<typeof api>;

describe('ProfileService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should update the profile', async () => {
    const profileData: Partial<User> = { name: 'New Name' };
    mockedApi.post.mockResolvedValue({ data: { results: profileData } });

    const result = await updateProfile(profileData);

    expect(mockedApi.post).toHaveBeenCalledWith('/profile', profileData, { headers: { 'Content-Type': 'multipart/form-data' } });
    expect(result).toEqual({ results: profileData });
  });

  it('should update the address', async () => {
    const addressData: Partial<Address> = { street: 'New Street' };
    mockedApi.post.mockResolvedValue({ data: { results: addressData } });

    const result = await updateAddress(addressData);

    expect(mockedApi.post).toHaveBeenCalledWith('/profile/address', addressData, { headers: { 'Content-Type': 'multipart/form-data' } });
    expect(result).toEqual({ results: addressData });
  });

  it('should update social links', async () => {
    const socialLinksData: { social_links: SocialLink[] } = { social_links: [{ platform: 'twitter', url: 'https://twitter.com/test' }] };
    mockedApi.post.mockResolvedValue({ data: { results: socialLinksData } });

    const result = await updateSocialLinks(socialLinksData);

    expect(mockedApi.post).toHaveBeenCalledWith('/profile/social-links', socialLinksData, { headers: { 'Content-Type': 'multipart/form-data' } });
    expect(result).toEqual({ results: socialLinksData });
  });

  it('should update the profile image', async () => {
    const file = new File([''], 'test.jpg', { type: 'image/jpeg' });
    const formData = new FormData();
    formData.append('profile_image', file);
    mockedApi.post.mockResolvedValue({ data: {} });

    await updateProfileImage(file);

    expect(mockedApi.post).toHaveBeenCalledWith('/profile/profile-image', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
  });

  it('should delete the profile image', async () => {
    mockedApi.delete.mockResolvedValue({ data: {} });

    await deleteProfileImage();

    expect(mockedApi.delete).toHaveBeenCalledWith('/profile/profile-image');
  });
});
