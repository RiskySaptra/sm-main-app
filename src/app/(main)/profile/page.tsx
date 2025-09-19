import { ProfileForm } from '@/components/auth/profile-form';

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">My Profile</h1>
        <ProfileForm />
      </div>
    </div>
  );
}